"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, AlertTriangle, User } from "lucide-react";

const TasksPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600 mt-2">View assigned tasks and deadlines</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Certificate Verification</span>
                  <Badge variant="secondary">Due Today</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">Verify birth certificate for Ravi Kumar</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Scheme Survey</span>
                  <Badge variant="secondary">Due Tomorrow</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">Survey Ward 2 for PM-KISAN scheme</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Completed Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Water Quality Check</span>
                  <Badge variant="default" className="bg-green-500">Completed</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">Checked water quality in Ward 1</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Asset Inspection</span>
                  <Badge variant="default" className="bg-green-500">Completed</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">Inspected roads in Ward 3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Monthly Report</span>
                  <Badge variant="outline">Next Week</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">Prepare monthly activity report</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Training Session</span>
                  <Badge variant="outline">Next Month</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">Attend digital literacy training</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksPage; 