"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  FileText,
  User,
  Calendar,
  Loader2,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import WarishEditForm from "@/components/WarishForm/warish-edit-form";

interface WarishApplication {
  id: string;
  acknowlegment: string;
  applicantName: string;
  applicantMobileNumber: string;
  relationwithdeceased: string;
  nameOfDeceased: string;
  dateOfDeath: string;
  gender: "male" | "female" | "other";
  maritialStatus: "married" | "unmarried" | "divorced" | "widowed";
  fatherName: string;
  spouseName?: string;
  villageName: string;
  postOffice: string;
  warishApplicationStatus: "submitted" | "pending" | "process" | "approved" | "rejected" | "cancelled" | "renewed";
  warishdocumentverified: boolean;
  warishRefNo?: string;
  warishRefDate?: string;
  approvalYear?: string;
  fieldreportRemark?: string;
  adminNoteRemark?: string;
  reportingDate: string;
  createdAt: string;
  updatedAt: string;
}

const EditWarishApplicationPage = ({ params }: { params: { id: string } }) => {
  const [application, setApplication] = useState<WarishApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [params.id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/warish-applications/${params.id}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch application");
      }

      const data = await response.json();
      setApplication(data);
    } catch (error) {
      console.error("Error fetching application:", error);
      toast.error("Failed to fetch application details");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedData: any) => {
    try {
      setSaving(true);
      const response = await fetch(`/api/warish-applications/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update application");
      }

      toast.success("Application updated successfully");
      // Redirect back to the detail page
      window.location.href = `/admindashboard/warish-certificates/${params.id}`;
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application");
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="default" className="bg-green-500">Approved</Badge>;
      case "process":
        return <Badge variant="default" className="bg-blue-500">In Process</Badge>;
      case "submitted":
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
      case "cancelled":
        return <Badge variant="destructive">Rejected</Badge>;
      case "renewed":
        return <Badge variant="default" className="bg-purple-500">Renewed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading application details...</span>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Not Found</h2>
          <p className="text-gray-600 mb-4">The warish application you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/admindashboard/warish-certificates">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Applications
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admindashboard/warish-certificates/${params.id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Application
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Edit Warish Application</h1>
          <p className="text-gray-600 mt-2">
            Acknowledgment: {application.acknowlegment}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(application.warishApplicationStatus)}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Application ID</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{application.acknowlegment}</div>
            <p className="text-xs text-muted-foreground">
              Acknowledgment number
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applicant</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{application.applicantName}</div>
            <p className="text-xs text-muted-foreground">
              {application.applicantMobileNumber}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Created Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(application.createdAt).toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Application submission date
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Edit Application Details
          </CardTitle>
          <CardDescription>
            Update the warish application information. All changes will be logged.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WarishEditForm 
            applicationId={params.id}
            initialData={application}
            onSave={handleSave}
            saving={saving}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditWarishApplicationPage; 