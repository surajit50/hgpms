import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if Stripe is configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const isConfigured = !!(stripeSecretKey && stripePublishableKey && stripeWebhookSecret);
    const isTestMode = stripeSecretKey?.startsWith('sk_test_') || false;

    return NextResponse.json({
      isConfigured,
      isTestMode,
      publishableKey: stripePublishableKey || null,
      hasWebhookSecret: !!stripeWebhookSecret,
    });
  } catch (error) {
    console.error("Error checking Stripe config:", error);
    return NextResponse.json(
      { error: "Failed to check Stripe configuration" },
      { status: 500 }
    );
  }
} 