import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only SUPER_ADMIN can assign plans
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { gpId, planId } = await req.json();

    if (!gpId || !planId) {
      return NextResponse.json({ 
        error: "Gram Panchayat ID and Plan ID are required" 
      }, { status: 400 });
    }

    // Verify Gram Panchayat exists
    const gramPanchayat = await db.gramPanchayat.findUnique({
      where: { id: gpId }
    });

    if (!gramPanchayat) {
      return NextResponse.json({ 
        error: "Gram Panchayat not found" 
      }, { status: 404 });
    }

    // Verify Plan exists and is active
    const plan = await db.plan.findUnique({
      where: { id: planId }
    });

    if (!plan) {
      return NextResponse.json({ 
        error: "Plan not found" 
      }, { status: 404 });
    }

    if (!plan.isActive) {
      return NextResponse.json({ 
        error: "Plan is not active" 
      }, { status: 400 });
    }

    // Check if GP already has an active subscription
    const existingSubscription = await db.subscription.findFirst({
      where: {
        gpId,
        status: {
          in: ["ACTIVE", "TRIALING"]
        }
      }
    });

    if (existingSubscription) {
      return NextResponse.json({ 
        error: "Gram Panchayat already has an active subscription" 
      }, { status: 400 });
    }

    // Calculate subscription end date (1 month from now)
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + plan.duration);

    // Create subscription
    const subscription = await db.subscription.create({
      data: {
        gpId,
        planId,
        status: "ACTIVE",
        currentPeriodEnd,
      },
      include: {
        plan: true,
        gramPanchayat: {
          select: {
            id: true,
            name: true,
            district: true,
            state: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      subscription,
      gramPanchayat: subscription.gramPanchayat,
      message: `Plan "${plan.name}" assigned to ${gramPanchayat.name}`
    }, { status: 201 });
  } catch (error) {
    console.error("Error assigning plan:", error);
    return NextResponse.json(
      { error: "Failed to assign plan" },
      { status: 500 }
    );
  }
} 