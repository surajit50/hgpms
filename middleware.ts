import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { currentRole, checkSubscriptionStatus } from "@/lib/auth";
import { db } from "@/lib/db";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const user = await currentRole().then((data) => {
    return data;
  });

  const admindashboard = nextUrl.pathname.startsWith("/admindashboard");
  const staffdashboard = nextUrl.pathname.startsWith("/employeedashboard");
  const superadmindashboard = nextUrl.pathname.startsWith("/superadmindashboard");

  // Role-based protection
  if (admindashboard && user !== "GP_ADMIN") {
    return Response.redirect(new URL("/", nextUrl));
  }
  if (staffdashboard && user !== "GP_STAFF") {
    return Response.redirect(new URL("/", nextUrl));
  }
  if (superadmindashboard && user !== "SUPER_ADMIN") {
    return Response.redirect(new URL("/", nextUrl));
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }

  // Subscription-based protection for GP_ADMIN and GP_STAFF
  if ((user === "GP_ADMIN" || user === "GP_STAFF") && req.auth?.user?.id) {
    try {
      const { hasActiveSubscription } = await checkSubscriptionStatus(req.auth.user.id);
      
      // Define subscription-required paths
      const subscriptionRequiredPaths = [
        "/admindashboard/certificates",
        "/admindashboard/schemes", 
        "/admindashboard/water",
        "/admindashboard/assets",
        "/admindashboard/staff",
        "/admindashboard/documents",
        "/employeedashboard/certificates",
        "/employeedashboard/schemes",
        "/employeedashboard/water",
        "/employeedashboard/assets",
        "/employeedashboard/documents",
      ];

      // Check if current path requires subscription
      const requiresSubscription = subscriptionRequiredPaths.some(path => 
        nextUrl.pathname.startsWith(path)
      );

      if (requiresSubscription && !hasActiveSubscription) {
        // Redirect to subscription page or billing page
        return Response.redirect(new URL("/billing", nextUrl));
      }

      // For dashboard pages, allow access but show subscription warning
      const isDashboardPage = nextUrl.pathname === "/admindashboard" || 
                             nextUrl.pathname === "/employeedashboard";

      if (isDashboardPage && !hasActiveSubscription) {
        // Allow access to dashboard but could show warning
        // You might want to add a query parameter to show subscription warning
        return;
      }

    } catch (error) {
      console.error("Error checking subscription in middleware:", error);
      // In case of error, allow access but log the issue
    }
  }

  // SUPER_ADMIN doesn't need subscription checks
  if (user === "SUPER_ADMIN") {
    return;
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admindashboard/:path*",
    "/employeedashboard/:path*",
    "/superadmindashboard/:path*",
  ],
};
