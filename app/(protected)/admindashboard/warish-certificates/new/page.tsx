"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Users } from "lucide-react";
import Link from "next/link";
import WarishFormComponent from "@/components/WarishForm";

const NewWarishApplicationPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admindashboard/warish-certificates">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Warish Certificates
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Warish Application</h1>
          <p className="text-gray-600 mt-2">Create a new inheritance certificate application</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Application Type</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Warish Certificate</div>
            <p className="text-xs text-muted-foreground">
              Inheritance certificate application
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Required Documents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Multiple</div>
            <p className="text-xs text-muted-foreground">
              Death certificate, family tree, etc.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15-30 Days</div>
            <p className="text-xs text-muted-foreground">
              Standard processing time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Warish Form */}
      <Card>
        <CardHeader>
          <CardTitle>Warish Application Form</CardTitle>
          <CardDescription>
            Fill in the details for the inheritance certificate application. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WarishFormComponent />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewWarishApplicationPage; 