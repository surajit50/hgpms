

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, Plus, Building, Droplets, Settings } from "lucide-react";

const AssetManagementPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asset Management</h1>
          <p className="text-gray-600 mt-2">Track roads, drainage, and infrastructure</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              
              Roads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Roads:</span>
                <span className="font-medium">15 km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Good Condition:</span>
                <span className="font-medium">12 km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Needs Repair:</span>
                <span className="font-medium">3 km</span>
              </div>
              <Badge variant="default" className="bg-green-500 w-full justify-center">
                80% Good Condition
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplets className="w-5 h-5 mr-2" />
              Drainage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Length:</span>
                <span className="font-medium">8 km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Functional:</span>
                <span className="font-medium">6 km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Blocked:</span>
                <span className="font-medium">2 km</span>
              </div>
              <Badge variant="secondary" className="w-full justify-center">
                75% Functional
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Buildings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Buildings:</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Good Condition:</span>
                <span className="font-medium">20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Needs Repair:</span>
                <span className="font-medium">5</span>
              </div>
              <Badge variant="default" className="bg-green-500 w-full justify-center">
                80% Good Condition
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetManagementPage; 