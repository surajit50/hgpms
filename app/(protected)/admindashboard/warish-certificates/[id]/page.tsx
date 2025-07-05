"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  FileText,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  Edit,
  Eye,
  Loader2,
  Building2,
  FileCheck,
  FileX
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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
  warishDetails: WarishDetail[];
  WarishDocument: WarishDocument[];
}

interface WarishDetail {
  id: string;
  name: string;
  gender: "male" | "female" | "other";
  relation: string;
  livingStatus: "alive" | "dead";
  maritialStatus: "married" | "unmarried" | "divorced" | "widowed";
  hasbandName?: string;
  children: WarishDetail[];
}

interface WarishDocument {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
}

const WarishApplicationDetailPage = ({ params }: { params: { id: string } }) => {
  const [application, setApplication] = useState<WarishApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingAction, setProcessingAction] = useState<string | null>(null);

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

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      setProcessingAction(newStatus);
      const response = await fetch(`/api/warish-applications/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          warishApplicationStatus: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      toast.success(`Application ${newStatus} successfully`);
      fetchApplication();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update application status");
    } finally {
      setProcessingAction(null);
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

  const getVerificationBadge = (verified: boolean) => {
    return verified ? (
      <Badge variant="default" className="bg-green-500">
        <FileCheck className="w-3 h-3 mr-1" />
        Verified
      </Badge>
    ) : (
      <Badge variant="secondary">
        <FileX className="w-3 h-3 mr-1" />
        Pending
      </Badge>
    );
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
          <Link href="/admindashboard/warish-certificates">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Warish Application</h1>
          <p className="text-gray-600 mt-2">
            Acknowledgment: {application.acknowlegment}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admindashboard/warish-certificates/${params.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Status and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Application Status</CardTitle>
              <CardDescription>Current status and available actions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(application.warishApplicationStatus)}
              {getVerificationBadge(application.warishdocumentverified)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {application.warishApplicationStatus === "submitted" && (
              <>
                <Button 
                  onClick={() => handleStatusUpdate("process")}
                  disabled={processingAction === "process"}
                >
                  {processingAction === "process" ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Clock className="w-4 h-4 mr-2" />
                  )}
                  Start Processing
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={processingAction === "rejected"}
                >
                  {processingAction === "rejected" ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  Reject
                </Button>
              </>
            )}
            {application.warishApplicationStatus === "process" && (
              <>
                <Button 
                  onClick={() => handleStatusUpdate("approved")}
                  disabled={processingAction === "approved"}
                >
                  {processingAction === "approved" ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Approve
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={processingAction === "rejected"}
                >
                  {processingAction === "rejected" ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  Reject
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Application Details */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Application Details</TabsTrigger>
          <TabsTrigger value="family">Family Tree</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Applicant Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Applicant Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-lg font-semibold">{application.applicantName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Mobile Number</label>
                  <p className="text-lg">{application.applicantMobileNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Relation to Deceased</label>
                  <p className="text-lg">{application.relationwithdeceased}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Father's Name</label>
                  <p className="text-lg">{application.fatherName}</p>
                </div>
                {application.spouseName && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Spouse's Name</label>
                    <p className="text-lg">{application.spouseName}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-lg">{application.villageName}, {application.postOffice}</p>
                </div>
              </CardContent>
            </Card>

            {/* Deceased Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Deceased Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-lg font-semibold">{application.nameOfDeceased}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date of Death</label>
                  <p className="text-lg">{new Date(application.dateOfDeath).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                  <p className="text-lg capitalize">{application.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Marital Status</label>
                  <p className="text-lg capitalize">{application.maritialStatus}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reference Information */}
          {application.warishRefNo && (
            <Card>
              <CardHeader>
                <CardTitle>Reference Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Warish Reference No.</label>
                    <p className="text-lg font-mono">{application.warishRefNo}</p>
                  </div>
                  {application.warishRefDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Reference Date</label>
                      <p className="text-lg">{new Date(application.warishRefDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {application.approvalYear && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Approval Year</label>
                      <p className="text-lg">{application.approvalYear}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Remarks */}
          {(application.fieldreportRemark || application.adminNoteRemark) && (
            <Card>
              <CardHeader>
                <CardTitle>Remarks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.fieldreportRemark && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Field Report Remark</label>
                    <p className="text-lg">{application.fieldreportRemark}</p>
                  </div>
                )}
                {application.adminNoteRemark && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Admin Note</label>
                    <p className="text-lg">{application.adminNoteRemark}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="family" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Family Tree
              </CardTitle>
              <CardDescription>
                Family members and their relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.warishDetails.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-gray-500">
                          {member.relation} • {member.livingStatus} • {member.maritialStatus}
                        </p>
                        {member.hasbandName && (
                          <p className="text-sm text-gray-500">Spouse: {member.hasbandName}</p>
                        )}
                      </div>
                      <Badge variant={member.livingStatus === "alive" ? "default" : "secondary"}>
                        {member.livingStatus}
                      </Badge>
                    </div>
                    {member.children.length > 0 && (
                      <div className="mt-3 pl-4 border-l-2 border-gray-200">
                        <p className="text-sm font-medium text-gray-500 mb-2">Children:</p>
                        {member.children.map((child) => (
                          <div key={child.id} className="text-sm text-gray-600">
                            • {child.name} ({child.relation})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents
              </CardTitle>
              <CardDescription>
                Uploaded documents for this application
              </CardDescription>
            </CardHeader>
            <CardContent>
              {application.WarishDocument.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No documents uploaded yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {application.WarishDocument.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{doc.title}</h4>
                          {doc.description && (
                            <p className="text-sm text-gray-500">{doc.description}</p>
                          )}
                          <p className="text-xs text-gray-400">
                            {doc.fileType} • {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
              <CardDescription>
                Key events in the application process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Application Submitted</p>
                    <p className="text-sm text-gray-500">
                      {new Date(application.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {application.warishApplicationStatus !== "submitted" && (
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Status Updated</p>
                      <p className="text-sm text-gray-500">
                        Current status: {application.warishApplicationStatus}
                      </p>
                    </div>
                  </div>
                )}
                {application.updatedAt !== application.createdAt && (
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Last Updated</p>
                      <p className="text-sm text-gray-500">
                        {new Date(application.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WarishApplicationDetailPage; 