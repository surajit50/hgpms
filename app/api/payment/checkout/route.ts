import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createCheckoutSession, stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "GP_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check Stripe configuration
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeSecretKey || !stripeWebhookSecret) {
      return NextResponse.json({ 
        error: "Stripe not configured. Please complete the deployment setup." 
      }, { status: 503 });
    }

    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
    }

    // Get plan
    const plan = await db.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    if (!plan.isActive) {
      return NextResponse.json({ error: "Plan is not active" }, { status: 400 });
    }

    // Validate Stripe price ID
    if (!plan.stripePriceId || !plan.stripePriceId.startsWith('price_')) {
      return NextResponse.json({ 
        error: `Invalid Stripe price ID for plan "${plan.name}". Please configure a valid Stripe price ID.` 
      }, { status: 400 });
    }

    // Verify the price exists in Stripe
    try {
      await stripe.prices.retrieve(plan.stripePriceId);
    } catch (error) {
      console.error("Error retrieving Stripe price:", error);
      return NextResponse.json({ 
        error: `Stripe price ID "${plan.stripePriceId}" not found. Please check your Stripe configuration.` 
      }, { status: 400 });
    }

    // Check if user already has an active subscription
    const existingSubscription = await db.subscription.findFirst({
      where: {
        gpId: session.user.gpId!,
        status: {
          in: ["ACTIVE", "TRIALING"]
        }
      }
    });

    if (existingSubscription) {
      return NextResponse.json({ 
        error: "You already have an active subscription" 
      }, { status: 400 });
    }

    // Get or create Stripe customer
    let customerId = session.user.stripeId;
    if (!customerId) {
      try {
        const customer = await stripe.customers.create({
          email: session.user.email,
          name: session.user.name || "",
          metadata: { 
            userId: session.user.id,
            gpId: session.user.gpId || ""
          },
        });
        customerId = customer.id;

        // Update user with Stripe ID
        await db.user.update({
          where: { id: session.user.id },
          data: { stripeId: customerId },
        });
      } catch (error) {
        console.error("Error creating Stripe customer:", error);
        return NextResponse.json({ 
          error: "Failed to create customer account" 
        }, { status: 500 });
      }
    }

    // Create checkout session
    try {
      const checkoutSession = await createCheckoutSession(
        customerId,
        plan.stripePriceId,
        session.user.gpId!
      );

      return NextResponse.json({ 
        url: checkoutSession.url,
        sessionId: checkoutSession.id,
        deploymentStatus: "active"
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('price')) {
          return NextResponse.json({ 
            error: `Invalid price configuration for plan "${plan.name}". Please check your Stripe price setup.` 
          }, { status: 400 });
        }
        if (error.message.includes('customer')) {
          return NextResponse.json({ 
            error: "Customer account issue. Please try again or contact support." 
          }, { status: 400 });
        }
      }
      
      return NextResponse.json({ 
        error: "Failed to create payment session. Please try again." 
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in checkout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
