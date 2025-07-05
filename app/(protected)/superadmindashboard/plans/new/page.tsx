"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Crown, 
  Plus, 
  X, 
  Loader2,
  ArrowLeft,
  CheckCircle,
  Copy,
  Search
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  stripePriceId: string;
  isActive: boolean;
}

interface Feature {
  value: string;
  label: string;
  description: string;
}

interface PlanFormData {
  name: string;
  price: number;
  duration: number;
  features: string[];
  stripePriceId: string;
  isActive: boolean;
}

const NewPlanPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [fetchingPlans, setFetchingPlans] = useState(false);
  const [fetchingFeatures, setFetchingFeatures] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedFeature, setSelectedFeature] = useState<string>("");
  const [formData, setFormData] = useState<PlanFormData>({
    name: "",
    price: 0,
    duration: 1,
    features: [],
    stripePriceId: "",
    isActive: true,
  });
  const [newFeature, setNewFeature] = useState("");

  // Fetch existing plans and features on component mount
  useEffect(() => {
    fetchPlans();
    fetchFeatures();
  }, []);

  const fetchPlans = async () => {
    try {
      setFetchingPlans(true);
      const response = await fetch("/api/plans");
      
      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }

      const data = await response.json();
      setPlans(data.plans || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to fetch existing plans");
    } finally {
      setFetchingPlans(false);
    }
  };

  const fetchFeatures = async () => {
    try {
      setFetchingFeatures(true);
      const response = await fetch("/api/features");
      
      if (!response.ok) {
        throw new Error("Failed to fetch features");
      }

      const data = await response.json();
      setFeatures(data.features || []);
    } catch (error) {
      console.error("Error fetching features:", error);
      toast.error("Failed to fetch available features");
    } finally {
      setFetchingFeatures(false);
    }
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    
    if (planId === "new") {
      // Reset form for new plan
      setFormData({
        name: "",
        price: 0,
        duration: 1,
        features: [],
        stripePriceId: "",
        isActive: true,
      });
      return;
    }

    const selectedPlan = plans.find(plan => plan.id === planId);
    if (selectedPlan) {
      setFormData({
        name: `${selectedPlan.name} Copy`,
        price: selectedPlan.price,
        duration: selectedPlan.duration,
        features: [...selectedPlan.features],
        stripePriceId: "",
        isActive: true,
      });
    }
  };

  const handleFeatureSelect = (featureValue: string) => {
    setSelectedFeature(featureValue);
    
    if (featureValue && !formData.features.includes(featureValue)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureValue]
      }));
    }
    setSelectedFeature("");
  };

  const handleInputChange = (field: keyof PlanFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const getFeatureLabel = (featureValue: string): string => {
    const feature = features.find(f => f.value === featureValue);
    return feature ? feature.label : featureValue;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.price <= 0 || formData.features.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch("/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create plan");
      }

      toast.success("Plan created successfully");
      router.push("/superadmindashboard/plans");
    } catch (error) {
      console.error("Error creating plan:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/superadmindashboard/plans">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plans
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Plan</h1>
            <p className="text-gray-600 mt-2">Add a new subscription plan</p>
          </div>
        </div>
      </div>

      {/* Plan Template Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Copy className="w-5 h-5 mr-2" />
            Plan Template
          </CardTitle>
          <CardDescription>
            Choose to create a new plan or use an existing plan as a template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="planTemplate">Select Template</Label>
              <Select value={selectedPlanId} onValueChange={handlePlanSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Create New Plan</SelectItem>
                  {fetchingPlans ? (
                    <SelectItem value="loading" disabled>
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading plans...</span>
                      </div>
                    </SelectItem>
                  ) : (
                    plans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{plan.name}</span>
                          <Badge variant="outline" className="ml-2">
                            ₹{plan.price}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {selectedPlanId && selectedPlanId !== "new" && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Copy className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Using "{plans.find(p => p.id === selectedPlanId)?.name}" as template
                  </span>
                </div>
                <p className="text-sm text-blue-600">
                  The form has been populated with the selected plan's data. You can modify any fields as needed.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="w-5 h-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Set the basic details for your new plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Plan Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Professional Plan"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                    placeholder="1999"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration (months) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 1)}
                    placeholder="1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="stripePriceId">Stripe Price ID *</Label>
                <Input
                  id="stripePriceId"
                  value={formData.stripePriceId}
                  onChange={(e) => handleInputChange("stripePriceId", e.target.value)}
                  placeholder="price_1234567890"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                />
                <Label htmlFor="isActive">Active Plan</Label>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Add features included in this plan</CardTitle>
              <CardDescription>
                Add features included in this plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="featureSelect">Add Feature</Label>
                <div className="flex space-x-2">
                  <Select value={selectedFeature} onValueChange={handleFeatureSelect}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a feature..." />
                    </SelectTrigger>
                    <SelectContent>
                      {fetchingFeatures ? (
                        <SelectItem value="loading" disabled>
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Loading features...</span>
                          </div>
                        </SelectItem>
                      ) : (
                        features.map((feature) => (
                          <SelectItem key={feature.value} value={feature.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{feature.label}</span>
                              <span className="text-xs text-gray-500">{feature.description}</span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="customFeature">Add Custom Feature</Label>
                <div className="flex space-x-2">
                  <Input
                    id="customFeature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="e.g., Custom Feature"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    disabled={!newFeature.trim()}
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Current Features</Label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{getFeatureLabel(feature)}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(feature)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {formData.features.length === 0 && (
                    <p className="text-sm text-gray-500">No features added yet</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Preview</CardTitle>
            <CardDescription>
              Preview how your plan will appear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{formData.name || "Plan Name"}</h3>
                {formData.isActive ? (
                  <Badge variant="default" className="bg-green-500">Active</Badge>
                ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </div>
              
              <div className="text-2xl font-bold mb-4">
                ₹{formData.price}/month
              </div>
              
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{getFeatureLabel(feature)}</span>
                  </div>
                ))}
                {formData.features.length === 0 && (
                  <p className="text-sm text-gray-500">No features added</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/superadmindashboard/plans")}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !formData.name || formData.price <= 0 || formData.features.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Plan...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create Plan
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPlanPage; 