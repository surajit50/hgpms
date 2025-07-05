

import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { getCurrentPlan } from "@/lib/data";

export async function SubscriptionStatus() {
  const session = await auth();

  if (!session?.user || session.user.role === "SUPER_ADMIN") {
    return null;
  }

  const plan = await getCurrentPlan(session.user.gpId || "");

  if (!plan) {
    return (
      <Badge variant="destructive" className="ml-4">
        No Active Subscription
      </Badge>
    );
  }

  return (
    <div className="flex items-center ml-4">
      <Badge variant={plan.name === "Pro" ? "premium" : "secondary"}>
        {plan.name} Plan
      </Badge>
      {plan.daysUntilExpiry < 30 && (
        <span className="ml-2 text-xs text-yellow-600">
          {plan.daysUntilExpiry} days left
        </span>
      )}
    </div>
  );
}
