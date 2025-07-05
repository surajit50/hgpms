import { redirect } from "next/navigation";
import { Feature, UserRole } from "@prisma/client"; // Import UserRole
import { hasFeatureAccess } from "./features";
import { auth } from "@/auth";
import { UpgradePrompt } from "@/components/billing/upgrade-prompt";

// Define proper user context type
type FeatureAccessContext = {
  role: UserRole; // Use the enum type from Prisma
  gpId: string;
};

/**
 * Guards a page or component by feature
 * Returns UpgradePrompt component if access is denied
 */
export async function featureGuard(feature: Feature): Promise<React.ReactNode> {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
    return null;
  }

  // Create properly typed context
  const userContext: FeatureAccessContext = {
    role: session.user.role as UserRole, // Assert as UserRole enum
    gpId: session.user.gpId || "", // Handle null case
  };

  const hasAccess = await hasFeatureAccess(userContext, feature);

  if (!hasAccess) {
    return <UpgradePrompt requiredFeature={feature} />;
  }

  return null;
}

/**
 * Guards a page by authentication and optional feature
 * Handles both authentication and feature access
 */
export async function protectedPage(
  feature: Feature | null = null
): Promise<React.ReactNode> {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
    return null;
  }

  if (feature) {
    // Create properly typed context
    const userContext: FeatureAccessContext = {
      role: session.user.role as UserRole,
      gpId: session.user.gpId || "",
    };

    const hasAccess = await hasFeatureAccess(userContext, feature);

    if (!hasAccess) {
      return <UpgradePrompt requiredFeature={feature} />;
    }
  }

  return null;
}