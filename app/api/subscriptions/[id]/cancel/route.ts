import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only SUPER_ADMIN can cancel subscriptions
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const subscriptionId = params.id;

    if (!subscriptionId) {
      return NextResponse.json({ 
        error: "Subscription ID is required" 
      }, { status: 400 });
    }

    // Find the subscription
    const subscription = await db.subscription.findUnique({
      where: { id: subscriptionId },
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

    if (!subscription) {
      return NextResponse.json({ 
        error: "Subscription not found" 
      }, { status: 404 });
    }

    // Update subscription status to cancelled
    const updatedSubscription = await db.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: "CANCELLED",
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
      subscription: updatedSubscription,
      message: `Subscription for ${subscription.gramPanchayat.name} has been cancelled`
    });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
} 