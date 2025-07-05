import Stripe from "stripe";
import { db } from "./db";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
  typescript: true,
});

// Create Stripe customer for GP Admin
export const createStripeCustomer = async (user: {
  id: string;
  email: string;
  name: string;
}) => {
  return stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: { userId: user.id },
  });
};

// Create Stripe checkout session
export const createCheckoutSession = async (
  customerId: string,
  priceId: string,
  gpId: string
) => {
  return stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/payment/cancel`,
    metadata: { gpId },
  });
};

// Manage Stripe webhooks
export const handleStripeWebhook = async (
  rawBody: Buffer,
  signature: string
) => {
  const event = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
      break;
    case "invoice.payment_succeeded":
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaid(invoice);
      break;
    case "customer.subscription.updated":
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdated(subscription);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return { status: "success" };
};

// Webhook handlers
const handleCheckoutCompleted = async (session: Stripe.Checkout.Session) => {
  const gpId = session.metadata?.gpId;
  if (!gpId) throw new Error("GP ID not found in session metadata");

  const subscriptionId = session.subscription as string;
  const subscription = (await stripe.subscriptions.retrieve(
    subscriptionId
  )) as Stripe.Subscription;
  const priceId = subscription.items.data[0].price.id;

  // Get plan from database
  const plan = await db.plan.findUnique({
    where: { stripePriceId: priceId },
  });

  if (!plan) throw new Error("Plan not found");

  // Safely get current period end (Stripe may use snake_case or camelCase)
  const currentPeriodEnd =
    (subscription as any).current_period_end ??
    (subscription as any).currentPeriodEnd;

  await db.subscription.create({
    data: {
      gpId,
      planId: plan.id,
      stripeSubId: subscriptionId,
      status: subscription.status.toUpperCase() as any,
      currentPeriodEnd: currentPeriodEnd
        ? new Date(currentPeriodEnd * 1000)
        : new Date(),
    },
  });
};

const handleInvoicePaid = async (invoice: Stripe.Invoice) => {
  // payment_intent may be a string or object, or missing
  const paymentIntentId =
    typeof (invoice as any).payment_intent === "string"
      ? (invoice as any).payment_intent
      : (invoice as any).payment_intent?.id;

  await db.payment.create({
    data: {
      gpId: invoice.metadata?.gpId || "",
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
      stripeId: paymentIntentId || "",
      status: "SUCCEEDED",
    },
  });
};

const handleSubscriptionUpdated = async (subscription: Stripe.Subscription) => {
  // Safely get current period end
  const currentPeriodEnd =
    (subscription as any).current_period_end ??
    (subscription as any).currentPeriodEnd;

  await db.subscription.update({
    where: { stripeSubId: subscription.id },
    data: {
      status: subscription.status.toUpperCase() as any,
      currentPeriodEnd: currentPeriodEnd
        ? new Date(currentPeriodEnd * 1000)
        : new Date(),
    },
  });
};
