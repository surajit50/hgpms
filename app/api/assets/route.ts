import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createAssetSchema = z.object({
  name: z.string().min(1, "Asset name is required"),
  type: z.enum(["ROAD", "DRAINAGE", "BUILDING", "PUMP", "TANK", "OTHER"]),
  location: z.string().min(1, "Location is required"),
  condition: z.enum(["GOOD", "FAIR", "POOR", "CRITICAL"]),
  length: z.number().positive().optional(),
  width: z.number().positive().optional(),
  area: z.number().positive().optional(),
  constructionDate: z.string().optional(),
  lastMaintenanceDate: z.string().optional(),
  nextMaintenanceDate: z.string().optional(),
  estimatedCost: z.number().positive().optional(),
  remarks: z.string().optional(),
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
    const condition = searchParams.get("condition") || "";

    const skip = (page - 1) * limit;

    let whereClause: any = {};

    // Filter by Gram Panchayat for GP users
    if (session.user.role !== "SUPER_ADMIN" && session.user.gpId) {
      whereClause.gpId = session.user.gpId;
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    if (type) {
      whereClause.type = type;
    }

    if (condition) {
      whereClause.condition = condition;
    }

    const [assets, total] = await Promise.all([
      db.asset.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          gramPanchayat: {
            select: { name: true }
          }
        }
      }),
      db.asset.count({ where: whereClause })
    ]);

    return NextResponse.json({
      assets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { error: "Failed to fetch assets" },
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

    // Only GP_ADMIN and GP_STAFF can create assets
    if (!["GP_ADMIN", "GP_STAFF"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = createAssetSchema.parse(body);

    const asset = await db.asset.create({
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

    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating asset:", error);
    return NextResponse.json(
      { error: "Failed to create asset" },
      { status: 500 }
    );
  }
} 