"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  FileText,
  Award,
  Droplets,
  Wrench,
  Building2,
  Settings,
  LogOut,
  User,
  Crown,
  Shield,
  AlertTriangle,
  CreditCard,
  BarChart3,
  CheckCircle,
  XCircle,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
  requiresSubscription?: boolean;
  description?: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  gpId?: string;
}

interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  planName?: string;
}

export const GPNavigation = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>({
    hasActiveSubscription: true, // Default to true for demo
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch current user data
      const userResponse = await fetch('/api/auth/me');
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          gpId: userData.gpId,
        });

        // Fetch subscription status for GP users
        if (["GP_ADMIN", "GP_STAFF"].includes(userData.role)) {
          const subscriptionResponse = await fetch('/api/subscription/status');
          if (subscriptionResponse.ok) {
            const subscriptionData = await subscriptionResponse.json();
            setSubscriptionStatus({
              hasActiveSubscription: subscriptionData.hasActiveSubscription,
              planName: subscriptionData.planName,
            });
          }
        } else {
          // SUPER_ADMIN doesn't need subscription
          setSubscriptionStatus({ hasActiveSubscription: true });
        }
      } else {
        // Fallback to path-based detection if auth fails
        let role = "GP_ADMIN";
        let name = "Amit Kumar";
        let email = "amit@hili-gp.in";
        
        if (pathname.includes("/superadmindashboard")) {
          role = "SUPER_ADMIN";
          name = "Super Admin";
          email = "admin@hgpms.com";
        } else if (pathname.includes("/employeedashboard")) {
          role = "GP_STAFF";
          name = "Rahul Sharma";
          email = "rahul@hili-gp.in";
        }

        setUser({
          id: "1",
          name,
          email,
          role,
          gpId: "1",
        });

        setSubscriptionStatus({ 
          hasActiveSubscription: true,
          planName: "Professional Plan"
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Fallback to path-based detection
      let role = "GP_ADMIN";
      let name = "Amit Kumar";
      let email = "amit@hili-gp.in";
      
      if (pathname.includes("/superadmindashboard")) {
        role = "SUPER_ADMIN";
        name = "Super Admin";
        email = "admin@hgpms.com";
      } else if (pathname.includes("/employeedashboard")) {
        role = "GP_STAFF";
        name = "Rahul Sharma";
        email = "rahul@hili-gp.in";
      }

      setUser({
        id: "1",
        name,
        email,
        role,
        gpId: "1",
      });

      setSubscriptionStatus({ 
        hasActiveSubscription: true,
        planName: "Professional Plan"
      });
    } finally {
      setLoading(false);
    }
  };

  const getMenuItems = (): MenuItem[] => {
    if (!user) return [];

    const baseItems: MenuItem[] = [
      {
        title: "Dashboard",
        href: getDashboardPath(),
        icon: LayoutDashboard,
        description: "Overview and statistics",
      },
    ];

    // SUPER_ADMIN items
    if (user.role === "SUPER_ADMIN") {
      return [
        ...baseItems,
        {
          title: "Gram Panchayats",
          href: "/superadmindashboard/gram-panchayats",
          icon: Building2,
          description: "Manage all Gram Panchayats",
        },
        {
          title: "Users",
          href: "/superadmindashboard/users",
          icon: Users,
          description: "Manage system users",
        },
        {
          title: "Plans & Pricing",
          href: "/superadmindashboard/plans",
          icon: Crown,
          description: "Manage subscription plans",
        },
        {
          title: "Assign Plans",
          href: "/superadmindashboard/assign-plans",
          icon: CreditCard,
          description: "Manually assign plans to Gram Panchayats",
        },
        {
          title: "Analytics",
          href: "/superadmindashboard/analytics",
          icon: BarChart3,
          description: "System-wide analytics",
        },
        {
          title: "System Settings",
          href: "/superadmindashboard/settings",
          icon: Settings,
          description: "Configure system settings",
        },
      ];
    }

    // GP_ADMIN items
    if (user.role === "GP_ADMIN") {
      return [
        ...baseItems,
        {
          title: "Staff",
          href: "/admindashboard/staff",
          icon: Users,
          description: "Manage staff members",
        },
        {
          title: "Certificates",
          href: "/admindashboard/certificates",
          icon: FileText,
          requiresSubscription: true,
          description: "Manage birth, death, marriage certificates",
        },
        {
          title: "Warish Certificates",
          href: "/admindashboard/warish-certificates",
          icon: FileText,
          requiresSubscription: true,
          description: "Manage inheritance certificates and applications",
        },
        {
          title: "Schemes",
          href: "/admindashboard/schemes",
          icon: Award,
          requiresSubscription: true,
          description: "Track government welfare schemes",
        },
        {
          title: "Water Management",
          href: "/admindashboard/water",
          icon: Droplets,
          requiresSubscription: true,
          description: "Monitor water supply and maintenance",
        },
        {
          title: "Assets",
          href: "/admindashboard/assets",
          icon: Wrench,
          requiresSubscription: true,
          description: "Track roads, drainage, infrastructure",
        },
        {
          title: "Settings",
          href: "/admindashboard/settings",
          icon: Settings,
          description: "Configure Gram Panchayat settings",
        },
      ];
    }

    // GP_STAFF items
    return [
      ...baseItems,
      {
        title: "Tasks",
        href: "/employeedashboard/tasks",
        icon: FileText,
        description: "View assigned tasks and deadlines",
      },
      {
        title: "Notifications",
        href: "/employeedashboard/notifications",
        icon: AlertTriangle,
        description: "View system notifications",
      },
      {
        title: "My Profile",
        href: "/employeedashboard/profile",
        icon: User,
        description: "Update personal information",
      }
    ];
  };

  const getDashboardPath = (): string => {
    if (!user) return "/";
    
    switch (user.role) {
      case "SUPER_ADMIN":
        return "/superadmindashboard";
      case "GP_ADMIN":
        return "/admindashboard";
      case "GP_STAFF":
        return "/employeedashboard";
      default:
        return "/";
    }
  };

  const getSubscriptionBadge = () => {
    if (!user || user.role === "SUPER_ADMIN") return null;

    if (!subscriptionStatus.hasActiveSubscription) {
      return (
        <Badge variant="destructive" className="text-xs">
          <AlertTriangle className="w-3 h-3 mr-1" />
          No Subscription
        </Badge>
      );
    }

    return (
      <Badge variant="default" className="text-xs bg-green-500">
        <CheckCircle className="w-3 h-3 mr-1" />
        {subscriptionStatus.planName || "Active"}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="w-64 bg-white border-r border-gray-200 h-screen">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = getMenuItems();
  const subscriptionBadge = getSubscriptionBadge();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">HGPMS</h1>
            <p className="text-xs text-gray-500">
              {user.role === "SUPER_ADMIN" ? "Super Admin" : 
               user.role === "GP_ADMIN" ? "GP Admin" : "Staff"}
            </p>
          </div>
        </div>
        
        {/* User Info */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="text-sm">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          {subscriptionBadge}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const isDisabled = item.disabled || 
              (item.requiresSubscription && !subscriptionStatus.hasActiveSubscription);

            return (
              <Link
                key={item.href}
                href={isDisabled ? "/billing" : item.href}
                className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : isDisabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className={`h-4 w-4 ${
                  isActive ? "text-blue-600" : 
                  isDisabled ? "text-gray-400" : "text-gray-500"
                }`} />
                <span className="flex-1">{item.title}</span>
                {item.requiresSubscription && !subscriptionStatus.hasActiveSubscription && (
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                )}
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
                {isActive && <ChevronRight className="h-3 w-3 text-blue-600" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          {/* Subscription Status */}
          {user.role !== "SUPER_ADMIN" && (
            <div className={`p-3 rounded-lg text-sm ${
              subscriptionStatus.hasActiveSubscription
                ? "bg-green-50 border border-green-200"
                : "bg-yellow-50 border border-yellow-200"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {subscriptionStatus.hasActiveSubscription ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-yellow-600" />
                )}
                <span className="font-medium">
                  {subscriptionStatus.hasActiveSubscription ? "Active Subscription" : "No Subscription"}
                </span>
              </div>
              {subscriptionStatus.planName && (
                <p className="text-xs text-gray-600">
                  Plan: {subscriptionStatus.planName}
                </p>
              )}
              {!subscriptionStatus.hasActiveSubscription && (
                <Button
                  asChild
                  size="sm"
                  className="w-full mt-2"
                  variant="outline"
                >
                  <Link href="/admindashboard/billing">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Subscribe
                  </Link>
                </Button>
              )}
            </div>
          )}

          {/* Sign Out */}
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
          >
            <Link href="/auth/logout">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
