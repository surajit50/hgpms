import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");
    const gpId = session.user.gpId;

    if (!gpId) {
      return NextResponse.json({ error: "GP ID not found" }, { status: 400 });
    }

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      gpId,
    };

    if (search) {
      where.OR = [
        { applicantName: { contains: search, mode: "insensitive" } },
        { nameOfDeceased: { contains: search, mode: "insensitive" } },
        { acknowlegment: { contains: search, mode: "insensitive" } },
        { warishRefNo: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      where.warishApplicationStatus = status;
    }

    // Get applications with pagination
    const [applications, total] = await Promise.all([
      db.warishApplication.findMany({
        where,
        include: {
          warishDetails: {
            include: {
              children: true,
            },
          },
          WarishDocument: true,
          gramPanchayat: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      db.warishApplication.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      warishApplications: applications,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching warish applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch warish applications" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const gpId = session.user.gpId;
    const userId = session.user.id;

    if (!gpId) {
      return NextResponse.json({ error: "GP ID not found" }, { status: 400 });
    }

    // Create warish application
    const warishApplication = await db.warishApplication.create({
      data: {
        ...body,
        gpId,
        createdBy: userId,
        warishApplicationStatus: "submitted",
        acknowlegment: generateAcknowledgmentNumber(),
      },
      include: {
        warishDetails: {
          include: {
            children: true,
          },
        },
        WarishDocument: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: warishApplication,
    });
  } catch (error) {
    console.error("Error creating warish application:", error);
    return NextResponse.json(
      { error: "Failed to create warish application" },
      { status: 500 }
    );
  }
}

function generateAcknowledgmentNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `WARISH-${timestamp}-${random}`;
} 