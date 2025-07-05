"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit,
  Download,
  CheckCircle,
  Clock,
  Loader2,
  FileCheck,
  FileX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface WarishApplication {
  id: string;
  applicantName: string;
  applicantMobileNumber: string;
  nameOfDeceased: string;
  dateOfDeath: string;
  warishApplicationStatus:
    | "submitted"
    | "pending"
    | "process"
    | "approved"
    | "rejected"
    | "cancelled"
    | "renewed";
  acknowlegment: string;
  reportingDate: string;
  createdAt: string;
  warishdocumentverified: boolean;
  warishRefNo?: string;
  warishRefDate?: string;
  approvalYear?: string;
  fieldreportRemark?: string;
  adminNoteRemark?: string;
}

interface Certificate {
  id: string;
  type: "WARISH";
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  certificateNumber: string;
  status:
    | "PENDING"
    | "ASSIGNED"
    | "UNDER_REVIEW"
    | "VERIFIED"
    | "APPROVED"
    | "REJECTED"
    | "ISSUED"
    | "EXPIRED"
    | "CANCELLED";
  issueDate?: string;
  createdAt: string;
}

interface ApiResponse {
  warishApplications?: WarishApplication[];
  certificates?: Certificate[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const WarishCertificatesPage = () => {
  const [warishApplications, setWarishApplications] = useState<
    WarishApplication[]
  >([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("applications");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [abortController, setAbortController] = useState(new AbortController());

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const fetchData = useCallback(async () => {
    abortController.abort();
    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: searchTerm,
        type: "WARISH",
      });

      const endpoint =
        activeTab === "applications"
          ? "/api/warish-applications"
          : "/api/certificates";

      const response = await fetch(`${endpoint}?${params}`, {
        signal: newAbortController.signal,
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (activeTab === "applications") {
          setWarishApplications(data.warishApplications || []);
        } else {
          setCertificates(data.certificates || []);
        }
        setPagination((prev) => ({
          ...prev,
          total: data.pagination.total,
          totalPages: data.pagination.totalPages,
        }));
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, searchTerm, activeTab, pagination.limit]);

  useEffect(() => {
    fetchData();
    return () => abortController.abort();
  }, [fetchData]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
      case "APPROVED":
      case "ISSUED":
        return (
          <Badge variant="default" className="bg-green-500">
            Approved
          </Badge>
        );
      case "process":
      case "UNDER_REVIEW":
      case "VERIFIED":
        return (
          <Badge variant="default" className="bg-blue-500">
            In Process
          </Badge>
        );
      case "submitted":
      case "pending":
      case "PENDING":
      case "ASSIGNED":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
      case "REJECTED":
      case "CANCELLED":
        return <Badge variant="destructive">Rejected</Badge>;
      case "renewed":
        return (
          <Badge variant="default" className="bg-purple-500">
            Renewed
          </Badge>
        );
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

  if (loading && warishApplications.length === 0 && certificates.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading warish certificates...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Warish Certificates
          </h1>
          <p className="text-gray-600 mt-2">
            Manage inheritance certificates and applications
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button asChild>
            <Link href="/admindashboard/warish-certificates/new">
              <Plus className="w-4 h-4 mr-2" />
              New Warish Application
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination.total}</div>
            <p className="text-xs text-muted-foreground">
              All warish applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                warishApplications.filter(
                  (app) => app.warishApplicationStatus === "approved"
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Approved applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                warishApplications.filter((app) =>
                  ["submitted", "pending", "process"].includes(
                    app.warishApplicationStatus
                  )
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Pending applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Issued Certificates
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {certificates.filter((cert) => cert.status === "ISSUED").length}
            </div>
            <p className="text-xs text-muted-foreground">Issued certificates</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Tabs */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search applications or certificates..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full md:w-auto"
        >
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Warish Applications</CardTitle>
                <CardDescription>
                  Manage inheritance applications and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Acknowledgment</TableHead>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Deceased</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warishApplications.length > 0 ? (
                      warishApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-mono text-sm">
                            {application.acknowlegment}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {application.applicantName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {application.applicantMobileNumber}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {application.nameOfDeceased}
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(
                                  application.dateOfDeath
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(application.warishApplicationStatus)}
                          </TableCell>
                          <TableCell>
                            {getVerificationBadge(
                              application.warishdocumentverified
                            )}
                          </TableCell>
                          <TableCell>
                            {new Date(application.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  href={`/admindashboard/warish-certificates/${application.id}`}
                                >
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  href={`/admindashboard/warish-certificates/${application.id}/edit`}
                                >
                                  <Edit className="w-4 h-4" />
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          {loading ? (
                            <div className="flex items-center justify-center">
                              <Loader2 className="h-5 w-5 animate-spin mr-2" />
                              Loading applications...
                            </div>
                          ) : (
                            "No warish applications found"
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {warishApplications.length > 0 && (
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-muted-foreground">
                      Showing {warishApplications.length} of {pagination.total}{" "}
                      applications
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1 || loading}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <span className="px-3 py-1 text-sm font-medium">
                        Page {pagination.page} of {pagination.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={
                          pagination.page === pagination.totalPages || loading
                        }
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Warish Certificates</CardTitle>
                <CardDescription>View issued warish certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate No.</TableHead>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certificates.length > 0 ? (
                      certificates.map((certificate) => (
                        <TableRow key={certificate.id}>
                          <TableCell className="font-mono text-sm">
                            {certificate.certificateNumber}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {certificate.applicantName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {certificate.applicantPhone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(certificate.status)}
                          </TableCell>
                          <TableCell>
                            {certificate.issueDate
                              ? new Date(certificate.issueDate).toLocaleDateString()
                              : "Not issued"}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  href={`/admindashboard/certificates/${certificate.id}`}
                                >
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          {loading ? (
                            <div className="flex items-center justify-center">
                              <Loader2 className="h-5 w-5 animate-spin mr-2" />
                              Loading certificates...
                            </div>
                          ) : (
                            "No certificates found"
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {certificates.length > 0 && (
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-muted-foreground">
                      Showing {certificates.length} of {pagination.total}{" "}
                      certificates
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1 || loading}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <span className="px-3 py-1 text-sm font-medium">
                        Page {pagination.page} of {pagination.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={
                          pagination.page === pagination.totalPages || loading
                        }
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WarishCertificatesPage;
