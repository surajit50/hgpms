"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Plus, Users, DollarSign, Calendar, CheckCircle } from "lucide-react";

const SchemesPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welfare Schemes</h1>
          <p className="text-gray-600 mt-2">Track government welfare schemes and beneficiaries</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Scheme
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              PM-KISAN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Direct income support to farmers
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Beneficiaries:</span>
                <span className="font-medium">150</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Amount:</span>
                <span className="font-medium">₹6,000/year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Status:</span>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              MGNREGA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Employment guarantee scheme
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Beneficiaries:</span>
                <span className="font-medium">200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Days Worked:</span>
                <span className="font-medium">45 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Status:</span>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              PMAY-G
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Housing for all rural families
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Beneficiaries:</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Amount:</span>
                <span className="font-medium">₹1.2L/house</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Status:</span>
                <Badge variant="secondary">In Progress</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchemesPage; 