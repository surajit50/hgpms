import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (!checkoutSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Check if the session belongs to the current user's GP
    if (checkoutSession.metadata?.gpId !== session.user.gpId) {
      return NextResponse.json({ error: "Session mismatch" }, { status: 403 });
    }

    // Check if payment was successful
    if (checkoutSession.payment_status === "paid") {
      return NextResponse.json({ 
        success: true, 
        status: checkoutSession.payment_status,
        subscriptionId: checkoutSession.subscription
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        status: checkoutSession.payment_status,
        error: "Payment not completed"
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
} 