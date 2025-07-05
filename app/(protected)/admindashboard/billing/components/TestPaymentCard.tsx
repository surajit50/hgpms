"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Zap, 
  AlertTriangle, 
  CheckCircle,
  Copy,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

interface TestPaymentCardProps {
  isTestMode: boolean;
}

const TestPaymentCard: React.FC<TestPaymentCardProps> = ({ isTestMode }) => {
  const [copiedCard, setCopiedCard] = useState<string | null>(null);

  const testCards = [
    {
      name: "Successful Payment",
      number: "4242 4242 4242 4242",
      description: "Payment will succeed immediately"
    },
    {
      name: "Declined Payment",
      number: "4000 0000 0000 0002",
      description: "Payment will be declined"
    },
    {
      name: "Requires Authentication",
      number: "4000 0025 0000 3155",
      description: "Requires 3D Secure authentication"
    }
  ];

  const copyToClipboard = (text: string, cardName: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopiedCard(cardName);
    toast.success(`${cardName} copied to clipboard`);
    setTimeout(() => setCopiedCard(null), 2000);
  };

  if (!isTestMode) {
    return null;
  }

  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-600" />
          <span>Test Payment Cards</span>
        </CardTitle>
        <CardDescription>
          Use these test cards to simulate different payment scenarios
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {testCards.map((card) => (
            <div
              key={card.name}
              className="flex items-center justify-between p-3 bg-white rounded-lg border"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{card.name}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    value={card.number}
                    readOnly
                    className="text-sm font-mono"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(card.number, card.name)}
                  >
                    {copiedCard === card.name ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Test Mode Active</h4>
              <p className="text-sm text-blue-700">
                You're currently in test mode. No real charges will be made.
                Use the test cards above to simulate payments.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestPaymentCard; 