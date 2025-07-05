"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Settings, 
  Globe, 
  Lock, 
  Zap,
  CheckCircle,
  ArrowRight,
  Copy
} from "lucide-react";
import { toast } from "sonner";

interface DeploymentGuideProps {
  isConfigured: boolean;
}

const DeploymentGuide: React.FC<DeploymentGuideProps> = ({ isConfigured }) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const deploymentSteps = [
    {
      id: 1,
      title: "Create Stripe Account",
      description: "Sign up for a Stripe account and get your API keys",
      icon: <Globe className="w-5 h-5" />,
      details: [
        "Go to stripe.com and create an account",
        "Switch to test mode for development",
        "Navigate to Developers > API keys",
        "Copy your publishable and secret keys"
      ],
      code: `STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...`
    },
    {
      id: 2,
      title: "Set Up Webhooks",
      description: "Configure webhook endpoints for payment processing",
      icon: <Settings className="w-5 h-5" />,
      details: [
        "Go to Developers > Webhooks in Stripe dashboard",
        "Add endpoint: https://yourdomain.com/api/webhooks/stripe",
        "Select events: checkout.session.completed, invoice.payment_succeeded, customer.subscription.updated",
        "Copy the webhook signing secret"
      ],
      code: `STRIPE_WEBHOOK_SECRET=whsec_...`
    },
    {
      id: 3,
      title: "Create Products & Prices",
      description: "Set up subscription products in Stripe dashboard",
      icon: <Lock className="w-5 h-5" />,
      details: [
        "Go to Products in Stripe dashboard",
        "Create products for each subscription plan",
        "Set up recurring prices (monthly billing)",
        "Copy the Price IDs (starts with 'price_')"
      ],
      code: `Basic Plan: price_1ABC123...
Professional Plan: price_1DEF456...
Enterprise Plan: price_1GHI789...`
    },
    {
      id: 4,
      title: "Update Database",
      description: "Link Stripe price IDs to your subscription plans",
      icon: <Zap className="w-5 h-5" />,
      details: [
        "Update the stripePriceId field in your plans table",
        "Ensure all plans have valid Stripe price IDs",
        "Test the payment flow with test cards",
        "Monitor webhook events in Stripe dashboard"
      ],
      code: `UPDATE plans SET stripePriceId = 'price_1ABC123' WHERE name = 'Basic Plan';`
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  if (isConfigured) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Deployment Complete</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700">
            Stripe payment gateway is successfully deployed and ready for use.
          </p>
          <Button variant="outline" className="mt-4">
            <BookOpen className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5" />
          <span>Deployment Guide</span>
        </CardTitle>
        <CardDescription>
          Follow these steps to deploy Stripe payment processing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {deploymentSteps.map((step) => (
          <div key={step.id} className="border rounded-lg p-4">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              <ArrowRight 
                className={`w-4 h-4 transition-transform ${
                  expandedStep === step.id ? 'rotate-90' : ''
                }`}
              />
            </div>
            
            {expandedStep === step.id && (
              <div className="mt-4 space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2">Steps:</h4>
                  <ul className="text-sm space-y-1">
                    {step.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Code:</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(step.code)}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                    <code>{step.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Need Help?</h4>
          <p className="text-sm text-blue-700 mb-3">
            If you encounter any issues during deployment, refer to the Stripe documentation or contact support.
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              Stripe Docs
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentGuide; 