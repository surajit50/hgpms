import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  price: z.number().positive("Price must be positive"),
  duration: z.number().positive("Duration must be positive"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  stripePriceId: z.string().min(1, "Stripe price ID is required"),
  isActive: z.boolean().default(true),
});

const updatePlanSchema = createPlanSchema.partial();

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only SUPER_ADMIN can view plans
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const isActive = searchParams.get("isActive");

    const skip = (page - 1) * limit;

    let whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    if (isActive !== null && isActive !== undefined) {
      whereClause.isActive = isActive === "true";
    }

    const [plans, total] = await Promise.all([
      db.plan.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: {
              subscriptions: true
            }
          }
        }
      }),
      db.plan.count({ where: whereClause })
    ]);

    return NextResponse.json({
      plans,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch plans" },
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

    // Only SUPER_ADMIN can create plans
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = createPlanSchema.parse(body);

    // Check if plan with same name already exists
    const existingPlan = await db.plan.findUnique({
      where: { name: validatedData.name }
    });

    if (existingPlan) {
      return NextResponse.json(
        { error: "Plan with this name already exists" },
        { status: 400 }
      );
    }

    // Check if stripe price ID already exists
    const existingStripePrice = await db.plan.findUnique({
      where: { stripePriceId: validatedData.stripePriceId }
    });

    if (existingStripePrice) {
      return NextResponse.json(
        { error: "Stripe price ID already exists" },
        { status: 400 }
      );
    }

    const plan = await db.plan.create({
      data: {
        ...validatedData,
        features: validatedData.features,
      },
      include: {
        _count: {
          select: {
            subscriptions: true
          }
        }
      }
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating plan:", error);
    return NextResponse.json(
      { error: "Failed to create plan" },
      { status: 500 }
    );
  }
} 