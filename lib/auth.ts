"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

// Role-based access control middleware
export const requireRole = async(role: string) => {
  return async (req: any) => {
    const session = await auth();
    if (!session || session.user?.role !== role) {
      return {
        redirect: {
          destination: `/auth/login?callbackUrl=${encodeURIComponent(req.url)}`,
          permanent: false,
        },
      };
    }
    return true;
  };
};

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};

// Subscription-based access control
export const checkSubscriptionStatus = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        gramPanchayat: {
          include: {
            subscription: {
              include: {
                plan: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user.gpId) {
      return { hasActiveSubscription: false, subscription: null };
    }

    const subscription = user.gramPanchayat?.subscription;
    
    if (!subscription) {
      return { hasActiveSubscription: false, subscription: null };
    }

    // Check if subscription is active and not expired
    const isActive = subscription.status === "ACTIVE" || subscription.status === "TRIALING";
    const isNotExpired = new Date() < subscription.currentPeriodEnd;

    return {
      hasActiveSubscription: isActive && isNotExpired,
      subscription,
    };
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return { hasActiveSubscription: false, subscription: null };
  }
};

// Check if user has access to specific features based on subscription
export const checkFeatureAccess = async (userId: string, feature: string) => {
  try {
    const { hasActiveSubscription, subscription } = await checkSubscriptionStatus(userId);
    
    if (!hasActiveSubscription) {
      return false;
    }

    // Get plan features
    const planFeatures = subscription?.plan?.features || [];
    
    // Check if the feature is included in the plan
    return planFeatures.includes(feature as any);
  } catch (error) {
    console.error("Error checking feature access:", error);
    return false;
  }
};

// Get user with subscription info
export const getUserWithSubscription = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        gramPanchayat: {
          include: {
            subscription: {
              include: {
                plan: true,
              },
            },
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user with subscription:", error);
    return null;
  }
};