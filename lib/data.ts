import { db } from "./db";

export async function getCurrentPlan(gpId: string) {
  if (!gpId) return null;

  const subscription = await db.subscription.findFirst({
    where: {
      gpId,
      status: "ACTIVE",
      currentPeriodEnd: {
        gt: new Date(),
      },
    },
    include: { plan: true },
  });

  if (!subscription) return null;

  // Calculate days until expiration
  const expiresAt = new Date(subscription.currentPeriodEnd);
  const today = new Date();
  const timeDiff = expiresAt.getTime() - today.getTime();
  const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return {
    id: subscription.id,
    name: subscription.plan.name,
    expiresAt: subscription.currentPeriodEnd,
    daysUntilExpiry,
    features: subscription.plan.features,
  };
}

export async function getAvailablePlans() {
  return db.plan.findMany({
    orderBy: { price: "asc" },
  });
}
