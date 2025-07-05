"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Plus, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const WaterManagementPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Water Management</h1>
          <p className="text-gray-600 mt-2">Monitor drinking water supply and maintenance</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplets className="w-5 h-5 mr-2" />
              Water Supply Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ward 1:</span>
                <Badge variant="default" className="bg-green-500">Normal</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Ward 2:</span>
                <Badge variant="secondary">Low Pressure</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Ward 3:</span>
                <Badge variant="destructive">No Supply</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Maintenance Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pipe Leakage</span>
                  <Badge variant="destructive">Urgent</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">Ward 3 - Main pipeline</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pump Maintenance</span>
                  <Badge variant="secondary">Scheduled</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">Water treatment plant</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Water Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">pH Level:</span>
                <span className="font-medium">7.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">TDS:</span>
                <span className="font-medium">150 ppm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Chlorine:</span>
                <span className="font-medium">0.5 mg/L</span>
              </div>
              <Badge variant="default" className="bg-green-500 w-full justify-center">
                Safe for Drinking
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaterManagementPage; 