"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, CheckCircle, Info, Clock } from "lucide-react";

const NotificationsPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">View system notifications and updates</p>
        </div>
        <Button variant="outline">
          Mark All Read
        </Button>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Water Supply Issue</h3>
                  <Badge variant="destructive">Urgent</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Water supply interrupted in Ward 3. Maintenance team has been notified.
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <Clock className="w-3 h-3 mr-1" />
                  2 hours ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Certificate Approved</h3>
                  <Badge variant="default" className="bg-green-500">Completed</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Birth certificate for Ravi Kumar has been approved and is ready for collection.
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <Clock className="w-3 h-3 mr-1" />
                  1 day ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-500 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">New Scheme Launched</h3>
                  <Badge variant="secondary">Info</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  PM-KISAN scheme registration is now open. Please inform eligible farmers.
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <Clock className="w-3 h-3 mr-1" />
                  3 days ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Asset Inspection Complete</h3>
                  <Badge variant="default" className="bg-green-500">Completed</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Road inspection in Ward 1 has been completed. All roads are in good condition.
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <Clock className="w-3 h-3 mr-1" />
                  1 week ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage; 