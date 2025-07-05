"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Loader2,
  Copy,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  price: number;
  stripePriceId: string | null;
  isActive: boolean;
  stripeValid: boolean;
  stripeError?: string;
}

interface StripePriceConfigProps {
  isSuperAdmin: boolean;
}

const StripePriceConfig: React.FC<StripePriceConfigProps> = ({ isSuperAdmin }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [priceId, setPriceId] = useState("");

  useEffect(() => {
    if (isSuperAdmin) {
      fetchPlansWithStripeStatus();
    }
  }, [isSuperAdmin]);

  const fetchPlansWithStripeStatus = async () => {
    try {
      const response = await fetch('/api/payment/setup-prices');
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      const data = await response.json();
      setPlans(data.plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to load plan configuration");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePriceId = async (planId: string) => {
    if (!priceId.trim()) {
      toast.error("Please enter a valid Stripe price ID");
      return;
    }

    if (!priceId.startsWith('price_')) {
      toast.error("Stripe price ID must start with 'price_'");
      return;
    }

    try {
      setUpdating(planId);
      
      const response = await fetch('/api/payment/setup-prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId, stripePriceId: priceId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update price ID');
      }

      const data = await response.json();
      toast.success(data.message);
      
      // Refresh the plans list
      await fetchPlansWithStripeStatus();
      
      // Reset form
      setEditingPlan(null);
      setPriceId("");
    } catch (error) {
      console.error("Error updating price ID:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update price ID");
    } finally {
      setUpdating(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  if (!isSuperAdmin) {
    return null;
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading plan configuration...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Stripe Price Configuration</span>
        </CardTitle>
        <CardDescription>
          Configure Stripe price IDs for subscription plans
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium">{plan.name}</h3>
                <p className="text-sm text-gray-600">₹{plan.price}/month</p>
              </div>
              <div className="flex items-center space-x-2">
                {plan.stripeValid ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Valid
                  </Badge>
                ) : plan.stripePriceId ? (
                  <Badge className="bg-red-100 text-red-800">
                    <XCircle className="w-3 h-3 mr-1" />
                    Invalid
                  </Badge>
                ) : (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Not Set
                  </Badge>
                )}
              </div>
            </div>

            {editingPlan === plan.id ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`price-${plan.id}`}>Stripe Price ID</Label>
                  <Input
                    id={`price-${plan.id}`}
                    value={priceId}
                    onChange={(e) => setPriceId(e.target.value)}
                    placeholder="price_1ABC123..."
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleUpdatePriceId(plan.id)}
                    disabled={updating === plan.id}
                  >
                    {updating === plan.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingPlan(null);
                      setPriceId("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {plan.stripePriceId ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={plan.stripePriceId}
                      readOnly
                      className="text-sm font-mono"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(plan.stripePriceId!)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No Stripe price ID configured</p>
                )}
                
                {plan.stripeError && (
                  <p className="text-sm text-red-600">{plan.stripeError}</p>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingPlan(plan.id);
                    setPriceId(plan.stripePriceId || "");
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {plan.stripePriceId ? "Edit" : "Configure"}
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">How to get Stripe Price IDs</h4>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Go to your Stripe Dashboard → Products</li>
            <li>2. Create products for each subscription plan</li>
            <li>3. Set up recurring prices (monthly billing)</li>
            <li>4. Copy the Price IDs (starts with 'price_')</li>
            <li>5. Configure them in the form above</li>
          </ol>
          <Button variant="outline" size="sm" className="mt-3">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Stripe Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StripePriceConfig; 