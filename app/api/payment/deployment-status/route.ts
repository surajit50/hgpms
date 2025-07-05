import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check Stripe configuration
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const configStatus = {
      hasSecretKey: !!stripeSecretKey,
      hasPublishableKey: !!stripePublishableKey,
      hasWebhookSecret: !!stripeWebhookSecret,
      isTestMode: stripeSecretKey?.startsWith('sk_test_') || false,
      isConfigured: !!(stripeSecretKey && stripePublishableKey && stripeWebhookSecret)
    };

    // Check database plans
    const plans = await db.plan.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        stripePriceId: true,
        isActive: true
      }
    });

    const plansStatus = {
      totalPlans: plans.length,
      plansWithStripeIds: plans.filter(p => p.stripePriceId).length,
      activePlans: plans.filter(p => p.isActive).length
    };

    // Test Stripe connection if configured
    let stripeConnectionStatus = null;
    if (configStatus.isConfigured) {
      try {
        const account = await stripe.accounts.retrieve();
        stripeConnectionStatus = {
          connected: true,
          accountId: account.id,
          chargesEnabled: account.charges_enabled,
          payoutsEnabled: account.payouts_enabled
        };
      } catch (error) {
        stripeConnectionStatus = {
          connected: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }

    // Check webhook endpoint
    const webhookStatus = {
      endpoint: process.env.NEXTAUTH_URL ? `${process.env.NEXTAUTH_URL}/api/webhooks/stripe` : null,
      configured: !!stripeWebhookSecret
    };

    return NextResponse.json({
      config: configStatus,
      plans: plansStatus,
      stripe: stripeConnectionStatus,
      webhook: webhookStatus,
      deploymentReady: configStatus.isConfigured && plansStatus.plansWithStripeIds > 0
    });
  } catch (error) {
    console.error("Error checking deployment status:", error);
    return NextResponse.json(
      { error: "Failed to check deployment status" },
      { status: 500 }
    );
  }
} 