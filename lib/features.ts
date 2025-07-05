import { db } from "./db";
import { UserRole, Feature } from "@prisma/client";

type FeatureMap = {
  [key in Feature]: {
    label: string;
    description: string;
    minRole: UserRole;
    plans: string[]; // Plan names that include this feature
  };
};

export const FEATURE_CONFIG: FeatureMap = {
  CERTIFICATE_MGMT: {
    label: "Certificate Management",
    description: "Issue and manage birth/death certificates",
    minRole: "GP_STAFF",
    plans: ["Free Trial", "Basic", "Pro"],
  },
  SCHEME_TRACKING: {
    label: "Welfare Scheme Tracking",
    description: "Track government welfare schemes",
    minRole: "GP_STAFF",
    plans: ["Basic", "Pro"],
  },
  WATER_MGMT: {
    label: "Water Management",
    description: "Monitor drinking water supply and quality",
    minRole: "GP_ADMIN",
    plans: ["Pro"],
  },
  ASSET_MGMT: {
    label: "Asset Management",
    description: "Track roads, drainage, and public assets",
    minRole: "GP_ADMIN",
    plans: ["Pro"],
  },
  REPORT_ANALYTICS: {
    label: "Advanced Reports",
    description: "Generate detailed analytics and reports",
    minRole: "GP_ADMIN",
    plans: ["Basic", "Pro"],
  },
  MULTI_STAFF: {
    label: "Multiple Staff Accounts",
    description: "Add multiple staff members to your GP",
    minRole: "GP_ADMIN",
    plans: ["Basic", "Pro"],
  },
  DOCUMENT_UPLOAD: {
    label: "Document Upload",
    description: "Upload supporting documents for records",
    minRole: "GP_STAFF",
    plans: ["Pro"],
  },
  GP_MGMT: {
    label: "GP Management",
    description: "Create and manage Gram Panchayats",
    minRole: "SUPER_ADMIN",
    plans: ["Pro"],
  },
};

const featureCache = new Map<string, boolean>();

export async function hasFeatureAccess(
  user: { role: UserRole; gpId: string },
  feature: Feature
): Promise<boolean> {
  const cacheKey = `${user.gpId}:${feature}`;

  // Check cache
  if (featureCache.has(cacheKey)) {
    return featureCache.get(cacheKey)!;
  }

  const config = FEATURE_CONFIG[feature];
  const roleLevels: UserRole[] = ["SUPER_ADMIN", "GP_ADMIN", "GP_STAFF"];

  // Super admin always has access
  if (user.role === "SUPER_ADMIN") {
    featureCache.set(cacheKey, true);
    return true;
  }

  // Role check
  if (roleLevels.indexOf(user.role) > roleLevels.indexOf(config.minRole)) {
    featureCache.set(cacheKey, false);
    return false;
  }

  // Get active subscription
  const subscription = await db.subscription.findFirst({
    where: {
      gpId: user.gpId,
      status: "ACTIVE",
    },
    include: { plan: true },
  });

  if (!subscription) {
    featureCache.set(cacheKey, false);
    return false;
  }

  // Check if feature is included in the plan
  const hasAccess =
    subscription.plan.features.includes(feature) &&
    config.plans.includes(subscription.plan.name);

  featureCache.set(cacheKey, hasAccess);
  return hasAccess;
}

// Clear cache when subscription changes
export function clearFeatureCacheForGP(gpId: string) {
  Array.from(featureCache.keys())
    .filter((key) => key.startsWith(`${gpId}:`))
    .forEach((key) => featureCache.delete(key));
}
