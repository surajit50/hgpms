import { UserRole, Feature } from "@prisma/client";

// Extend Prisma types if needed
export type ExtendedFeature = Feature | "CUSTOM_FEATURE";

// Context for feature checks
export type FeatureAccessContext = {
  role: UserRole;
  gpId: string;
};

// Session user type
export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  gpId: string | null;
};


