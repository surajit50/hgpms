import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only SUPER_ADMIN can set up prices
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { planId, stripePriceId } = await req.json();

    if (!planId || !stripePriceId) {
      return NextResponse.json({ 
        error: "Plan ID and Stripe Price ID are required" 
      }, { status: 400 });
    }

    // Validate Stripe price ID format
    if (!stripePriceId.startsWith('price_')) {
      return NextResponse.json({ 
        error: "Invalid Stripe price ID format. Must start with 'price_'" 
      }, { status: 400 });
    }

    // Verify the price exists in Stripe
    try {
      const price = await stripe.prices.retrieve(stripePriceId);
      console.log("Retrieved Stripe price:", price.id);
    } catch (error) {
      console.error("Error retrieving Stripe price:", error);
      return NextResponse.json({ 
        error: `Stripe price ID "${stripePriceId}" not found. Please check your Stripe configuration.` 
      }, { status: 400 });
    }

    // Update the plan with the Stripe price ID
    try {
      const updatedPlan = await db.plan.update({
        where: { id: planId },
        data: { stripePriceId },
        include: {
          _count: {
            select: {
              subscriptions: true
            }
          }
        }
      });

      return NextResponse.json({
        success: true,
        plan: updatedPlan,
        message: `Plan "${updatedPlan.name}" updated with Stripe price ID: ${stripePriceId}`
      });
    } catch (error) {
      console.error("Error updating plan:", error);
      return NextResponse.json({ 
        error: "Failed to update plan with Stripe price ID" 
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in setup-prices:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only SUPER_ADMIN can view price setup
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get all plans with their Stripe price status
    const plans = await db.plan.findMany({
      orderBy: { price: "asc" },
      select: {
        id: true,
        name: true,
        price: true,
        stripePriceId: true,
        isActive: true
      }
    });

    // Check which plans have valid Stripe prices
    const plansWithStripeStatus = await Promise.all(
      plans.map(async (plan) => {
        let stripeValid = false;
        let stripeError = null;

        if (plan.stripePriceId) {
          try {
            await stripe.prices.retrieve(plan.stripePriceId);
            stripeValid = true;
          } catch (error) {
            stripeError = error instanceof Error ? error.message : "Unknown error";
          }
        }

        return {
          ...plan,
          stripeValid,
          stripeError
        };
      })
    );

    return NextResponse.json({
      plans: plansWithStripeStatus,
      summary: {
        totalPlans: plans.length,
        plansWithStripeIds: plans.filter(p => p.stripePriceId).length,
        validStripePrices: plansWithStripeStatus.filter(p => p.stripeValid).length,
        invalidStripePrices: plansWithStripeStatus.filter(p => p.stripePriceId && !p.stripeValid).length
      }
    });
  } catch (error) {
    console.error("Error getting price setup:", error);
    return NextResponse.json(
      { error: "Failed to get price setup information" },
      { status: 500 }
    );
  }
} 