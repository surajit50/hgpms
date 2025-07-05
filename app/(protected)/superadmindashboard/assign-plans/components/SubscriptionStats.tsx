"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2,
  CheckCircle,
  XCircle,
  Crown,
  TrendingUp,
  Users,
  Calendar
} from "lucide-react";

interface SubscriptionStatsProps {
  totalGramPanchayats: number;
  withSubscription: number;
  withoutSubscription: number;
  activePlans: number;
  totalRevenue: number;
  recentAssignments: number;
}

const SubscriptionStats: React.FC<SubscriptionStatsProps> = ({
  totalGramPanchayats,
  withSubscription,
  withoutSubscription,
  activePlans,
  totalRevenue,
  recentAssignments
}) => {
  const subscriptionRate = totalGramPanchayats > 0 
    ? Math.round((withSubscription / totalGramPanchayats) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Total Gram Panchayats</p>
              <p className="text-2xl font-bold">{totalGramPanchayats}</p>
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
              <p className="text-2xl font-bold">{withSubscription}</p>
              <p className="text-xs text-green-600">{subscriptionRate}% coverage</p>
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
              <p className="text-2xl font-bold">{withoutSubscription}</p>
              <p className="text-xs text-red-600">Need attention</p>
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
              <p className="text-2xl font-bold">{activePlans}</p>
              <p className="text-xs text-purple-600">Available for assignment</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-600">From active subscriptions</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm text-gray-600">Recent Assignments</p>
              <p className="text-2xl font-bold">{recentAssignments}</p>
              <p className="text-xs text-orange-600">This month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionStats; 