"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  CreditCard, 
  TrendingUp,
  Plus,
  Eye,
  Settings,
  BarChart3
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalGPs: number;
  activeSubscriptions: number;
  totalRevenue: number;
  pendingApprovals: number;
}

interface RecentGP {
  id: string;
  name: string;
  district: string;
  state: string;
  status: string;
  createdAt: string;
}

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalGPs: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
  });
  const [recentGPs, setRecentGPs] = useState<RecentGP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // In a real app, you'd fetch this from your API
      setStats({
        totalGPs: 24,
        activeSubscriptions: 18,
        totalRevenue: 125000,
        pendingApprovals: 3,
      });

      setRecentGPs([
        {
          id: "1",
          name: "Hili Gram Panchayat",
          district: "Cooch Behar",
          state: "West Bengal",
          status: "Active",
          createdAt: "2024-01-15",
        },
        {
          id: "2",
          name: "Dhalpara Gram Panchayat",
          district: "Alipurduar",
          state: "West Bengal",
          status: "Active",
          createdAt: "2024-01-10",
        },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage all Gram Panchayats and subscriptions</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/superadmindashboard/createGP">
              <Plus className="w-4 h-4 mr-2" />
              Create GP
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/superadmindashboard/plans">
              <Settings className="w-4 h-4 mr-2" />
              Manage Plans
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total GPs</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGPs}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.activeSubscriptions / stats.totalGPs) * 100).toFixed(1)}% active rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent GPs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Gram Panchayats</CardTitle>
          <CardDescription>
            Recently created and active Gram Panchayats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentGPs.map((gp) => (
              <div
                key={gp.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{gp.name}</h3>
                    <p className="text-sm text-gray-500">
                      {gp.district}, {gp.state}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={gp.status === "Active" ? "default" : "secondary"}>
                    {gp.status}
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/superadmindashboard/gp/${gp.id}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              View detailed analytics and reports
            </p>
            <Button asChild className="w-full">
              <Link href="/superadmindashboard/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Manage all users and permissions
            </p>
            <Button asChild className="w-full">
              <Link href="/superadmindashboard/users">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Monitor and manage subscriptions
            </p>
            <Button asChild className="w-full">
              <Link href="/superadmindashboard/subscriptions">View Subscriptions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
