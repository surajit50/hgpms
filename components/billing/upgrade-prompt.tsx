import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Feature } from "@prisma/client";
import { FEATURE_CONFIG } from "@/lib/features";

interface UpgradePromptProps {
  requiredFeature: Feature;
}

export function UpgradePrompt({ requiredFeature }: UpgradePromptProps) {
  const featureConfig = FEATURE_CONFIG[requiredFeature];

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <CardTitle>Feature Locked</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-lg font-medium">
            {featureConfig.label} is only available in Pro plan
          </p>
          <p className="text-muted-foreground mb-6">
            {featureConfig.description}
          </p>
          <Button asChild className="w-full">
            <Link href={`/billing?feature=${requiredFeature}`}>
              Upgrade to Pro
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Already upgraded?{" "}
            <Link href="/billing" className="text-primary underline">
              Refresh subscription
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
