"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Crown,
  Star,
  Users,
  FileText,
  Droplets,
  Wrench,
  Building2,
  BarChart3,
  Upload,
  Shield,
  Loader2,
  Zap,
  Globe,
  Lock,
  Settings,
  Play,
  Pause
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StripePriceConfig from "./components/StripePriceConfig";

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  stripePriceId: string;
  popular?: boolean;
}

interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  planName: string | null;
  expiresAt?: string;
}

interface StripeConfig {
  isTestMode: boolean;
  publishableKey: string;
  isConfigured: boolean;
}

const BillingPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  const [stripeConfig, setStripeConfig] = useState<StripeConfig | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState<'ready' | 'configuring' | 'deployed'>('ready');
  const router = useRouter();

  useEffect(() => {
    fetchPlans();
    fetchSubscriptionStatus();
    checkStripeConfig();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans/available');
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to load subscription plans");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch('/api/subscription/status');
      if (!response.ok) {
        throw new Error('Failed to fetch subscription status');
      }
      const data = await response.json();
      setSubscriptionStatus(data);
    } catch (error) {
      console.error("Error fetching subscription status:", error);
    }
  };

  const checkStripeConfig = async () => {
    try {
      const response = await fetch('/api/payment/config');
      if (response.ok) {
        const config = await response.json();
        setStripeConfig(config);
        setDeploymentStatus(config.isConfigured ? 'deployed' : 'configuring');
      }
    } catch (error) {
      console.error("Error checking Stripe config:", error);
      setDeploymentStatus('configuring');
    }
  };

  const handleSubscribe = async (planId: string, stripePriceId: string) => {
    try {
      setProcessingPayment(planId);
      
      const response = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process payment");
    } finally {
      setProcessingPayment(null);
    }
  };

  const getFeatureIcon = (feature: string) => {
    const featureIcons: { [key: string]: React.ReactNode } = {
      'Certificate Management': <FileText className="w-4 h-4 text-blue-500" />,
      'Scheme Tracking': <Building2 className="w-4 h-4 text-green-500" />,
      'Water Management': <Droplets className="w-4 h-4 text-blue-500" />,
      'Asset Management': <Wrench className="w-4 h-4 text-orange-500" />,
      'Staff Management': <Users className="w-4 h-4 text-purple-500" />,
      'Reports & Analytics': <BarChart3 className="w-4 h-4 text-indigo-500" />,
      'API Access': <Upload className="w-4 h-4 text-gray-500" />,
      'Priority Support': <Shield className="w-4 h-4 text-red-500" />,
    };
    return featureIcons[feature] || <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span>Loading subscription plans...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Zap className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">Stripe Payment Deployment</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Deploy and manage your subscription plans with secure Stripe payment processing.
        </p>
      </div>

      {/* Deployment Status */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span>Payment Gateway Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {deploymentStatus === 'deployed' ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Deployed & Active</span>
                </>
              ) : deploymentStatus === 'configuring' ? (
                <>
                  <Settings className="w-5 h-5 text-yellow-600 animate-spin" />
                  <span className="text-yellow-700 font-medium">Configuring...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-700 font-medium">Ready to Deploy</span>
                </>
              )}
            </div>
            {stripeConfig?.isTestMode && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <Zap className="w-3 h-3 mr-1" />
                Test Mode
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      {subscriptionStatus?.hasActiveSubscription ? (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Active Subscription</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">
              You have an active subscription to <strong>{subscriptionStatus.planName}</strong>.
              {subscriptionStatus.expiresAt && (
                <span> Expires on {new Date(subscriptionStatus.expiresAt).toLocaleDateString()}</span>
              )}
            </p>
            <Button asChild className="mt-4">
              <Link href="/admindashboard">
                Go to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span>No Active Subscription</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700">
              You don't have an active subscription. Subscribe to access advanced features.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Plans */}
      {plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-blue-500 ring-2 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name}</span>
                  {plan.popular && <Crown className="w-5 h-5 text-blue-500" />}
                </CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {getFeatureIcon(feature)}
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.id, plan.stripePriceId)}
                  disabled={processingPayment === plan.id || deploymentStatus !== 'deployed'}
                >
                  {processingPayment === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Subscribe Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Plans Available</h3>
            <p className="text-gray-600">
              No subscription plans are currently available. Please contact support.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Payment Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-green-600" />
            <span>Secure Payment Processing</span>
          </CardTitle>
          <CardDescription>
            Your payments are processed securely through Stripe with enterprise-grade security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold">PCI DSS Compliant</h3>
                <p className="text-sm text-gray-600">
                  Highest level of payment security certification
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CreditCard className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold">Multiple Payment Methods</h3>
                <p className="text-sm text-gray-600">
                  Credit cards, debit cards, and digital wallets
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Globe className="w-6 h-6 text-purple-500 mt-1" />
              <div>
                <h3 className="font-semibold">Global Support</h3>
                <p className="text-sm text-gray-600">
                  Supports payments from around the world
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>What You Get</CardTitle>
          <CardDescription>
            Comprehensive features to manage your Gram Panchayat efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <FileText className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold">Certificate Management</h3>
                <p className="text-sm text-gray-600">
                  Issue and manage birth, death, and marriage certificates
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Building2 className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold">Scheme Tracking</h3>
                <p className="text-sm text-gray-600">
                  Track government welfare schemes and beneficiaries
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Droplets className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold">Water Management</h3>
                <p className="text-sm text-gray-600">
                  Monitor drinking water supply and maintenance
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Wrench className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h3 className="font-semibold">Asset Management</h3>
                <p className="text-sm text-gray-600">
                  Track roads, drainage, and infrastructure
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Users className="w-6 h-6 text-purple-500 mt-1" />
              <div>
                <h3 className="font-semibold">Staff Management</h3>
                <p className="text-sm text-gray-600">
                  Manage team members and their permissions
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <BarChart3 className="w-6 h-6 text-indigo-500 mt-1" />
              <div>
                <h3 className="font-semibold">Reports & Analytics</h3>
                <p className="text-sm text-gray-600">
                  Generate comprehensive reports and insights
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stripe Price Configuration */}
      {stripeConfig?.isConfigured && (
        <StripePriceConfig isSuperAdmin={session?.user?.role === "SUPER_ADMIN"} />
      )}

      {/* Deployment Actions */}
      {deploymentStatus !== 'deployed' && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-orange-600" />
              <span>Complete Stripe Deployment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-4">
              To enable payments, you need to complete the Stripe configuration.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" asChild>
                <Link href="/admindashboard/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure Stripe
                </Link>
              </Button>
              <Button variant="outline">
                <Globe className="w-4 h-4 mr-2" />
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BillingPage; 