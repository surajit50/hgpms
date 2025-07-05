"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";

const PaymentCancelPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="border-yellow-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="w-16 h-16 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl text-yellow-700">
              Payment Cancelled
            </CardTitle>
            <CardDescription>
              Your payment was cancelled. No charges were made to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">What happened?</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• You cancelled the payment process</li>
                <li>• No charges were made to your account</li>
                <li>• Your subscription remains unchanged</li>
                <li>• You can try again anytime</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/admindashboard/billing">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Try Again
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/admindashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCancelPage; 