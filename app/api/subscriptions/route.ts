import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only SUPER_ADMIN can view all subscriptions
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const skip = (page - 1) * limit;

    let whereClause: any = {};

    if (search) {
      whereClause.OR = [
        {
          gramPanchayat: {
            name: { contains: search, mode: "insensitive" }
          }
        },
        {
          gramPanchayat: {
            district: { contains: search, mode: "insensitive" }
          }
        }
      ];
    }

    if (status) {
      whereClause.status = status.toUpperCase();
    }

    const [subscriptions, total] = await Promise.all([
      db.subscription.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          plan: true,
          gramPanchayat: {
            select: {
              id: true,
              name: true,
              district: true,
              state: true,
              adminName: true,
              adminEmail: true
            }
          }
        }
      }),
      db.subscription.count({ where: whereClause })
    ]);

    return NextResponse.json({
      subscriptions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriptions" },
      { status: 500 }
    );
  }
} 