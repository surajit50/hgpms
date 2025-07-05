import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // SUPER_ADMIN doesn't need subscription
    if (session.user.role === "SUPER_ADMIN") {
      return NextResponse.json({
        hasActiveSubscription: true,
        planName: "Super Admin",
      });
    }

    // Check if user has a GP ID
    if (!session.user.gpId) {
      return NextResponse.json({
        hasActiveSubscription: false,
        planName: null,
      });
    }

    // Get subscription for the Gram Panchayat
    const subscription = await db.subscription.findFirst({
      where: {
        gpId: session.user.gpId,
        status: {
          in: ["ACTIVE", "TRIALING"]
        }
      },
      include: {
        plan: true
      }
    });

    if (!subscription) {
      return NextResponse.json({
        hasActiveSubscription: false,
        planName: null,
      });
    }

    return NextResponse.json({
      hasActiveSubscription: true,
      planName: subscription.plan.name,
      expiresAt: subscription.currentPeriodEnd,
    });
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription status" },
      { status: 500 }
    );
  }
} 