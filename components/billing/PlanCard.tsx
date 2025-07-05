"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plan } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { createCheckoutSessions } from "@/app/(gp-admin)/billing/actions";


export function PlanCard({
  plan,
  currentPlan,
}: {
  plan: Plan;
  currentPlan: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubscribe = async () => {
    if (!session?.user?.gpId) return;

    setLoading(true);
    try {
      const { url } = await createCheckoutSessions(plan.id);
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={currentPlan ? "ring-2 ring-primary" : ""}>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {plan.name}
          {currentPlan && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Current Plan
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-3xl font-bold">₹{plan.price}/month</p>
          <p className="text-muted-foreground">per Gram Panchayat</p>
        </div>

        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Icons.check className="h-4 w-4 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubscribe}
          disabled={loading || currentPlan}
          className="w-full"
        >
          {loading ? (
            <Icons.spinner className="h-4 w-4 animate-spin mr-2" />
          ) : currentPlan ? (
            "Current Plan"
          ) : (
            "Subscribe"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
