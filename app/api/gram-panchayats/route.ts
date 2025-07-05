import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createGramPanchayatSchema = z.object({
  name: z.string().min(1, "Name is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  contact: z.string().min(10, "Valid contact number is required"),
  adminName: z.string().min(1, "Admin name is required"),
  adminEmail: z.string().email("Valid admin email is required"),
  adminPhone: z.string().min(10, "Valid admin phone is required"),
  population: z.number().optional(),
  wards: z.number().optional(),
  address: z.string().min(1, "Address is required"),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only SUPER_ADMIN can view all Gram Panchayats
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const status = searchParams.get("status") || "";

    const skip = (page - 1) * limit;

    let whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { district: { contains: search, mode: "insensitive" } },
        { state: { contains: search, mode: "insensitive" } },
        // Only search adminName if it's not null
        { 
          AND: [
            { adminName: { not: null } },
            { adminName: { contains: search, mode: "insensitive" } }
          ]
        },
        // Only search address if it's not null
        { 
          AND: [
            { address: { not: null } },
            { address: { contains: search, mode: "insensitive" } }
          ]
        },
      ];
    }

    if (state) {
      whereClause.state = state;
    }

    if (status) {
      whereClause.status = status;
    }

    const [gramPanchayats, total] = await Promise.all([
      db.gramPanchayat.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: {
              users: true,
              certificates: true,
            }
          },
          subscription: {
            include: {
              plan: true
            }
          }
        }
      }),
      db.gramPanchayat.count({ where: whereClause })
    ]);

    // Transform the data to handle null values
    const transformedGramPanchayats = gramPanchayats.map(gp => ({
      ...gp,
      adminName: gp.adminName || "Not Assigned",
      adminEmail: gp.adminEmail || "Not Assigned",
      adminPhone: gp.adminPhone || "Not Assigned",
      address: gp.address || "Address Not Available",
      contact: gp.contact || "Contact Not Available"
    }));

    return NextResponse.json({
      gramPanchayats: transformedGramPanchayats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching Gram Panchayats:", error);
    return NextResponse.json(
      { error: "Failed to fetch Gram Panchayats" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only SUPER_ADMIN can create Gram Panchayats
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = createGramPanchayatSchema.parse(body);

    // Check if Gram Panchayat with same name in same district already exists
    const existingGP = await db.gramPanchayat.findFirst({
      where: {
        name: validatedData.name,
        district: validatedData.district,
        state: validatedData.state,
      }
    });

    if (existingGP) {
      return NextResponse.json(
        { error: "Gram Panchayat with this name already exists in this district" },
        { status: 400 }
      );
    }

    const gramPanchayat = await db.gramPanchayat.create({
      data: {
        ...validatedData,
        status: "ACTIVE",
        
      },
      include: {
        _count: {
          select: {
            users: true,
            certificates: true,
          }
        }
      }
    });

    return NextResponse.json(gramPanchayat, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating Gram Panchayat:", error);
    return NextResponse.json(
      { error: "Failed to create Gram Panchayat" },
      { status: 500 }
    );
  }
} 