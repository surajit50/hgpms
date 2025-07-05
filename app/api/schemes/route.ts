import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createSchemeSchema = z.object({
  name: z.string().min(1, "Scheme name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["AGRICULTURE", "HEALTH", "EDUCATION", "HOUSING", "EMPLOYMENT", "OTHER"]),
  amount: z.number().positive("Amount must be positive"),
  unit: z.string().min(1, "Unit is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  eligibilityCriteria: z.string().min(1, "Eligibility criteria is required"),
  documentsRequired: z.array(z.string()).optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]).default("ACTIVE"),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const status = searchParams.get("status") || "";

    const skip = (page - 1) * limit;

    let whereClause: any = {};

    // Filter by Gram Panchayat for GP users
    if (session.user.role !== "SUPER_ADMIN" && session.user.gpId) {
      whereClause.gpId = session.user.gpId;
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (type) {
      whereClause.type = type;
    }

    if (status) {
      whereClause.status = status;
    }

    const [schemes, total] = await Promise.all([
      db.scheme.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          gramPanchayat: {
            select: { name: true }
          },
          _count: {
            select: {
              beneficiaries: true
            }
          }
        }
      }),
      db.scheme.count({ where: whereClause })
    ]);

    return NextResponse.json({
      schemes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching schemes:", error);
    return NextResponse.json(
      { error: "Failed to fetch schemes" },
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

    // Only GP_ADMIN can create schemes
    if (session.user.role !== "GP_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = createSchemeSchema.parse(body);

    const scheme = await db.scheme.create({
      data: {
        ...validatedData,
        gpId: session.user.gpId!,
        createdBy: session.user.id,
      },
      include: {
        gramPanchayat: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json(scheme, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating scheme:", error);
    return NextResponse.json(
      { error: "Failed to create scheme" },
      { status: 500 }
    );
  }
} 