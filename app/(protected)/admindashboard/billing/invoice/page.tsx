"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Calendar, DollarSign } from "lucide-react";

const InvoicePage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="text-gray-600 mt-2">View your billing history and invoices</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Plan:</span>
                <span className="font-medium">Professional Plan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Amount:</span>
                <span className="font-medium">₹1,999/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Next Billing:</span>
                <span className="font-medium">Feb 15, 2024</span>
              </div>
              <Badge variant="default" className="bg-green-500 w-full justify-center">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <div>
                  <div className="text-sm font-medium">January 2024</div>
                  <div className="text-xs text-gray-500">Professional Plan</div>
                </div>
                <Badge variant="default" className="bg-green-500">Paid</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <div>
                  <div className="text-sm font-medium">December 2023</div>
                  <div className="text-xs text-gray-500">Professional Plan</div>
                </div>
                <Badge variant="default" className="bg-green-500">Paid</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <div>
                  <div className="text-sm font-medium">November 2023</div>
                  <div className="text-xs text-gray-500">Basic Plan</div>
                </div>
                <Badge variant="default" className="bg-green-500">Paid</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Recent Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">INV-2024-001</div>
                  <div className="text-xs text-gray-500">Jan 15, 2024</div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">INV-2023-012</div>
                  <div className="text-xs text-gray-500">Dec 15, 2023</div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">INV-2023-011</div>
                  <div className="text-xs text-gray-500">Nov 15, 2023</div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoicePage; 