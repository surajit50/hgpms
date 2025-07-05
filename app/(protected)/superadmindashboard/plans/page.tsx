"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Crown,
  Plus,
  Edit,
  Trash2,
  Star,
  CheckCircle,
  Users,
  FileText,
  Award,
  Droplets,
  Wrench,
  BarChart3,
  Upload,
  Shield,
  Zap,
  DollarSign,
  Loader2,
  AlertTriangle,
  Eye
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  stripePriceId: string;
  isActive: boolean;
  createdAt: string;
  _count: {
    subscriptions: number;
  };
}

interface ApiResponse {
  plans: Plan[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const PlansPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchPlans();
  }, [pagination.page, searchTerm]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: searchTerm,
      });

      const response = await fetch(`/api/plans?${params}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }

      const data: ApiResponse = await response.json();
      setPlans(data.plans);
      setPagination(prev => ({
        ...prev,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      }));
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) {
      return;
    }

    try {
      const response = await fetch(`/api/plans/${planId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete plan");
      }

      toast.success("Plan deleted successfully");
      fetchPlans(); // Refresh the list
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete plan");
    }
  };

  const handleToggleActive = async (planId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/plans/${planId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !currentStatus,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update plan");
      }

      toast.success(`Plan ${!currentStatus ? "activated" : "deactivated"} successfully`);
      fetchPlans(); // Refresh the list
    } catch (error) {
      console.error("Error updating plan:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update plan");
    }
  };

  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && plans.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading plans...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plans & Pricing</h1>
          <p className="text-gray-600 mt-2">Manage subscription plans and pricing</p>
        </div>
        <Button asChild>
          <Link href="/superadmindashboard/plans/new">
            <Plus className="w-4 h-4 mr-2" />
            Add New Plan
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plans</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination.total}</div>
            <p className="text-xs text-muted-foreground">
              Available plans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {plans.filter(plan => plan.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {plans.reduce((sum, plan) => sum + plan._count.subscriptions, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all plans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{plans.reduce((sum, plan) => sum + (plan.price * plan._count.subscriptions), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Projected monthly
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by plan name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <Card>
        <CardHeader>
          <CardTitle>All Plans</CardTitle>
          <CardDescription>
            Manage subscription plans and pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative ${!plan.isActive ? 'opacity-60' : ''}`}
                >
                  {plan._count.subscriptions > 0 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white">
                        <Users className="w-3 h-3 mr-1" />
                        {plan._count.subscriptions} subscribers
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Crown className="w-5 h-5 mr-2" />
                        {plan.name}
                      </CardTitle>
                      {!plan.isActive && (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                    <CardDescription>
                      <span className="text-3xl font-bold">₹{plan.price}</span>
                      <span className="text-gray-500">/month</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{plan.duration} months</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Subscribers:</span>
                        <span className="font-medium">{plan._count.subscriptions}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Monthly Revenue:</span>
                        <span className="font-medium">₹{(plan.price * plan._count.subscriptions).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button 
                        className="flex-1" 
                        variant="outline"
                        asChild
                      >
                        <Link href={`/superadmindashboard/plans/${plan.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Link>
                      </Button>
                      <Button 
                        className="flex-1" 
                        variant="outline"
                        asChild
                      >
                        <Link href={`/superadmindashboard/plans/${plan.id}/edit`}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleActive(plan.id, plan.isActive)}
                      >
                        {plan.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        disabled={plan._count.subscriptions > 0}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlansPage; 