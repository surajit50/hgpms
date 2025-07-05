"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Building2, Users, Shield, Bell, Globe } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Configure Gram Panchayat settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Gram Panchayat Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input 
                type="text" 
                defaultValue="Hili Gram Panchayat"
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">District</label>
              <input 
                type="text" 
                defaultValue="North 24 Parganas"
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">State</label>
              <input 
                type="text" 
                defaultValue="West Bengal"
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Staff Members</span>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Permissions</span>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Roles</span>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Password Policy</span>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Two-Factor Auth</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Session Timeout</span>
              <Button variant="outline" size="sm">Set</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Email Notifications</span>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">SMS Alerts</span>
              <Button variant="outline" size="sm">Setup</Button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Push Notifications</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage; 