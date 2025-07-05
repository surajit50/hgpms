import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createWaterReportSchema = z.object({
  ward: z.string().min(1, "Ward is required"),
  supplyStatus: z.enum(["NORMAL", "LOW_PRESSURE", "NO_SUPPLY", "MAINTENANCE"]),
  qualityStatus: z.enum(["SAFE", "UNSAFE", "TESTING"]),
  phLevel: z.number().min(0).max(14).optional(),
  tdsLevel: z.number().positive().optional(),
  chlorineLevel: z.number().positive().optional(),
  issues: z.array(z.string()).optional(),
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
    const ward = searchParams.get("ward") || "";
    const supplyStatus = searchParams.get("supplyStatus") || "";
    const qualityStatus = searchParams.get("qualityStatus") || "";

    const skip = (page - 1) * limit;

    let whereClause: any = {};

    // Filter by Gram Panchayat for GP users
    if (session.user.role !== "SUPER_ADMIN" && session.user.gpId) {
      whereClause.gpId = session.user.gpId;
    }

    if (ward) {
      whereClause.ward = ward;
    }

    if (supplyStatus) {
      whereClause.supplyStatus = supplyStatus;
    }

    if (qualityStatus) {
      whereClause.qualityStatus = qualityStatus;
    }

    const [waterReports, total] = await Promise.all([
      db.waterReport.findMany({
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
      db.waterReport.count({ where: whereClause })
    ]);

    return NextResponse.json({
      waterReports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching water reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch water reports" },
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

    // Only GP_ADMIN and GP_STAFF can create water reports
    if (!["GP_ADMIN", "GP_STAFF"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = createWaterReportSchema.parse(body);

    const waterReport = await db.waterReport.create({
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

    return NextResponse.json(waterReport, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating water report:", error);
    return NextResponse.json(
      { error: "Failed to create water report" },
      { status: 500 }
    );
  }
} 