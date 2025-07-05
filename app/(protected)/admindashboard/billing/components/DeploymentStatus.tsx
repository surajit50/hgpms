"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Settings, 
  Globe, 
  Lock, 
  Zap,
  Loader2
} from "lucide-react";

interface DeploymentStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  icon: React.ReactNode;
}

interface DeploymentStatusProps {
  isConfigured: boolean;
  isTestMode: boolean;
  hasWebhookSecret: boolean;
}

const DeploymentStatus: React.FC<DeploymentStatusProps> = ({
  isConfigured,
  isTestMode,
  hasWebhookSecret
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const deploymentSteps: DeploymentStep[] = [
    {
      id: 'stripe-keys',
      name: 'Stripe API Keys',
      description: 'Configure Stripe secret and publishable keys',
      status: isConfigured ? 'completed' : 'pending',
      icon: <Lock className="w-4 h-4" />
    },
    {
      id: 'webhook-secret',
      name: 'Webhook Secret',
      description: 'Set up webhook endpoint for payment processing',
      status: hasWebhookSecret ? 'completed' : 'pending',
      icon: <Globe className="w-4 h-4" />
    },
    {
      id: 'test-mode',
      name: 'Test Mode',
      description: 'Verify test mode configuration',
      status: isTestMode ? 'completed' : 'pending',
      icon: <Zap className="w-4 h-4" />
    }
  ];

  const completedSteps = deploymentSteps.filter(step => step.status === 'completed').length;
  const progress = (completedSteps / deploymentSteps.length) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'failed':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Deployment Status</span>
        </CardTitle>
        <CardDescription>
          Stripe payment gateway deployment progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Deployment Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {deploymentSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border ${getStatusColor(step.status)}`}
            >
              <div className="flex items-center space-x-2">
                {getStatusIcon(step.status)}
                <div>
                  <h4 className="font-medium">{step.name}</h4>
                  <p className="text-sm opacity-80">{step.description}</p>
                </div>
              </div>
              {step.status === 'pending' && (
                <Badge variant="secondary">Pending</Badge>
              )}
              {step.status === 'completed' && (
                <Badge className="bg-green-100 text-green-800">Complete</Badge>
              )}
            </div>
          ))}
        </div>

        {/* Status Summary */}
        <div className="mt-4 p-4 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Overall Status</h4>
              <p className="text-sm text-gray-600">
                {isConfigured && hasWebhookSecret 
                  ? 'Payment gateway is ready for deployment'
                  : 'Configuration required to enable payments'
                }
              </p>
            </div>
            <Badge 
              variant={isConfigured && hasWebhookSecret ? "default" : "secondary"}
              className={isConfigured && hasWebhookSecret ? "bg-green-500" : ""}
            >
              {isConfigured && hasWebhookSecret ? 'Ready' : 'Configuring'}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        {!(isConfigured && hasWebhookSecret) && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure Stripe
            </Button>
            <Button variant="outline" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              View Docs
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeploymentStatus; 