import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";


import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const stripeSessionId = searchParams.session_id;
  if (!stripeSessionId) redirect("/");

  // Retrieve subscription from Stripe
  const subscription = await db.subscription.findFirst({
    where: {
      gpId: session.user.gpId!,
      stripeSubId: { not: null },
    },
    include: { plan: true },
  });

  if (!subscription) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="text-center">
              <Icons.warning className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Processing Your Payment</h2>
              <p className="text-muted-foreground mt-2">
                Your payment is being processed. This may take a few moments.
              </p>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <Icons.spinner className="h-8 w-8 animate-spin mx-auto" />
            <p className="mt-4">
              Please wait while we confirm your subscription...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center">
            <Icons.checkCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
            <p className="text-muted-foreground mt-2">
              Thank you for subscribing to {subscription.plan.name} plan.
            </p>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
            <p className="font-medium">Subscription Activated</p>
            <p className="text-sm mt-1">
              You now have full access to all features in your plan.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex justify-between">
              <span>Plan</span>
              <span className="font-medium">{subscription.plan.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount Paid</span>
              <span className="font-medium">₹{subscription.plan.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Next Billing Date</span>
              <span className="font-medium">
                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
        <CardContent className="text-center">
          <Button asChild className="w-full">
            <a href="/gp-admin/dashboard">Go to Dashboard</a>
          </Button>
          <Button variant="outline" className="w-full mt-4">
            Download Invoice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
