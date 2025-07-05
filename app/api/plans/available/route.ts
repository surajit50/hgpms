import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only GP_ADMIN can view available plans
    if (session.user.role !== "GP_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get active plans
    const plans = await db.plan.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        price: "asc"
      }
    });

    // Transform plans to include popular flag (mark middle plan as popular)
    const transformedPlans = plans.map((plan, index) => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      features: plan.features,
      stripePriceId: plan.stripePriceId,
      popular: plans.length >= 3 && index === 1 // Mark middle plan as popular if 3+ plans
    }));

    return NextResponse.json(transformedPlans);
  } catch (error) {
    console.error("Error fetching available plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch plans" },
      { status: 500 }
    );
  }
} 