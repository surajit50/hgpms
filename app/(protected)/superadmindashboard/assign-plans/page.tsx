"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users,
  Crown,
  Building2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Search,
  Filter,
  Calendar,
  CreditCard
} from "lucide-react";
import { toast } from "sonner";

interface GramPanchayat {
  id: string;
  name: string;
  district: string;
  state: string;
  adminName: string | null;
  adminEmail: string | null;
  adminPhone: string | null;
  address: string | null;
  contact: string | null;
  status: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  isActive: boolean;
}

interface Subscription {
  id: string;
  gpId: string;
  planId: string;
  status: string;
  currentPeriodEnd: string;
  plan: Plan;
}

const AssignPlansPage = () => {
  const [gramPanchayats, setGramPanchayats] = useState<GramPanchayat[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [assigning, setAssigning] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch Gram Panchayats
      const gpResponse = await fetch('/api/gram-panchayats');
      if (gpResponse.ok) {
        const gpData = await gpResponse.json();
        setGramPanchayats(gpData.gramPanchayats || []);
      }

      // Fetch Plans
      const plansResponse = await fetch('/api/plans');
      if (plansResponse.ok) {
        const plansData = await plansResponse.json();
        setPlans(plansData.plans || []);
      }

      // Fetch Subscriptions
      const subscriptionsResponse = await fetch('/api/subscriptions');
      if (subscriptionsResponse.ok) {
        const subscriptionsData = await subscriptionsResponse.json();
        setSubscriptions(subscriptionsData.subscriptions || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignPlan = async (gpId: string, planId: string) => {
    try {
      setAssigning(gpId);
      
      const response = await fetch('/api/subscriptions/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gpId, planId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to assign plan');
      }

      const data = await response.json();
      toast.success(`Plan assigned successfully to ${data.gramPanchayat.name}`);
      
      // Refresh data
      await fetchData();
    } catch (error) {
      console.error("Error assigning plan:", error);
      toast.error(error instanceof Error ? error.message : "Failed to assign plan");
    } finally {
      setAssigning(null);
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    try {
      setAssigning(subscriptionId);
      
      const response = await fetch(`/api/subscriptions/${subscriptionId}/cancel`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to cancel subscription');
      }

      toast.success("Subscription cancelled successfully");
      
      // Refresh data
      await fetchData();
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error(error instanceof Error ? error.message : "Failed to cancel subscription");
    } finally {
      setAssigning(null);
    }
  };

  const getSubscriptionForGP = (gpId: string) => {
    return subscriptions.find(sub => sub.gpId === gpId);
  };

  const filteredGramPanchayats = gramPanchayats.filter(gp => {
    const matchesSearch = gp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gp.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gp.adminName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gp.adminEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gp.adminPhone?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const subscription = getSubscriptionForGP(gp.id);
    const hasSubscription = !!subscription;
    
    // Filter by subscription status
    if (filterStatus === "with-subscription") return matchesSearch && hasSubscription;
    if (filterStatus === "without-subscription") return matchesSearch && !hasSubscription;
    
    // Filter by plan if selected
    if (selectedPlan && selectedPlan !== "all") {
      const currentPlan = subscription ? plans.find(p => p.id === subscription.planId) : null;
      return matchesSearch && currentPlan?.id === selectedPlan;
    }
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span>Loading Gram Panchayats...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assign Plans</h1>
          <p className="text-gray-600">
            Manually assign subscription plans to Gram Panchayats
          </p>
        </div>
        <Button onClick={fetchData} variant="outline">
          <Loader2 className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name, district, or admin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Gram Panchayats</SelectItem>
                  <SelectItem value="with-subscription">With Subscription</SelectItem>
                  <SelectItem value="without-subscription">Without Subscription</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="plan-filter">Plan</Label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Gram Panchayats</p>
                <p className="text-2xl font-bold">{gramPanchayats.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">With Subscription</p>
                <p className="text-2xl font-bold">
                  {gramPanchayats.filter(gp => getSubscriptionForGP(gp.id)).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Without Subscription</p>
                <p className="text-2xl font-bold">
                  {gramPanchayats.filter(gp => !getSubscriptionForGP(gp.id)).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Active Plans</p>
                <p className="text-2xl font-bold">
                  {plans.filter(plan => plan.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gram Panchayats List */}
      <Card>
        <CardHeader>
          <CardTitle>Gram Panchayats</CardTitle>
          <CardDescription>
            Manage subscription assignments for all Gram Panchayats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGramPanchayats.length === 0 ? (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No Gram Panchayats found matching your criteria.</p>
              </div>
            ) : (
              filteredGramPanchayats.map((gp) => {
                const subscription = getSubscriptionForGP(gp.id);
                const currentPlan = subscription ? plans.find(p => p.id === subscription.planId) : null;
                
                return (
                  <div key={gp.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Building2 className="w-5 h-5 text-blue-500" />
                          <div>
                            <h3 className="font-medium">{gp.name}</h3>
                            <p className="text-sm text-gray-600">
                              {gp.district}, {gp.state}
                            </p>
                            <p className="text-sm text-gray-500">
                              Admin: {gp.adminName || "Not Assigned"} ({gp.adminEmail || "Not Assigned"})
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {subscription ? (
                          <div className="text-right">
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {subscription.status}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">
                              {currentPlan?.name} - ₹{currentPlan?.price}/month
                            </p>
                            <p className="text-xs text-gray-500">
                              Expires: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                            </p>
                          </div>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="w-3 h-3 mr-1" />
                            No Subscription
                          </Badge>
                        )}
                        
                        <div className="flex space-x-2">
                          {subscription ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelSubscription(subscription.id)}
                              disabled={assigning === subscription.id}
                            >
                              {assigning === subscription.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Cancel"
                              )}
                            </Button>
                          ) : (
                            <Select onValueChange={(planId) => handleAssignPlan(gp.id, planId)}>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Assign Plan" />
                              </SelectTrigger>
                              <SelectContent>
                                {plans.filter(plan => plan.isActive).map((plan) => (
                                  <SelectItem key={plan.id} value={plan.id}>
                                    {plan.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignPlansPage; 