"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus,
  FileText,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import Link from "next/link";

interface Certificate {
  id: string;
  type: "BIRTH" | "DEATH" | "MARRIAGE" | "RESIDENCE";
  name: string;
  fatherName?: string;
  motherName?: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  address: string;
  certificateNumber: string;
  issueDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ISSUED";
}

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "1",
      type: "BIRTH",
      name: "Ravi Kumar",
      fatherName: "Rajesh Kumar",
      motherName: "Sunita Devi",
      dateOfBirth: "2024-01-15",
      address: "Ward 5, Hili Village",
      certificateNumber: "BIRTH-2024-001",
      issueDate: "2024-01-16",
      status: "PENDING",
    },
    {
      id: "2",
      type: "DEATH",
      name: "Ram Prasad",
      dateOfDeath: "2024-01-10",
      address: "Ward 3, Hili Village",
      certificateNumber: "DEATH-2024-001",
      issueDate: "2024-01-12",
      status: "APPROVED",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || cert.type === filterType;
    const matchesStatus = filterStatus === "all" || cert.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "ISSUED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "BIRTH":
        return "bg-blue-100 text-blue-800";
      case "DEATH":
        return "bg-red-100 text-red-800";
      case "MARRIAGE":
        return "bg-green-100 text-green-800";
      case "RESIDENCE":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Certificate Management</h1>
          <p className="text-gray-600 mt-2">Manage birth, death, and marriage certificates</p>
        </div>
        <Button asChild>
          <Link href="/employeedashboard/certificates/new">
            <Plus className="w-4 h-4 mr-2" />
            New Certificate
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or certificate number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Certificate Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="BIRTH">Birth Certificate</SelectItem>
                <SelectItem value="DEATH">Death Certificate</SelectItem>
                <SelectItem value="MARRIAGE">Marriage Certificate</SelectItem>
                <SelectItem value="RESIDENCE">Residence Certificate</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="ISSUED">Issued</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Certificates List */}
      <Card>
        <CardHeader>
          <CardTitle>Certificates ({filteredCertificates.length})</CardTitle>
          <CardDescription>
            All certificates in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm text-gray-500">
                      {cert.fatherName && `Father: ${cert.fatherName}`}
                      {cert.motherName && ` | Mother: ${cert.motherName}`}
                    </p>
                    <p className="text-xs text-gray-400">
                      {cert.address} • {cert.certificateNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(cert.type)}>
                    {cert.type}
                  </Badge>
                  <Badge className={getStatusColor(cert.status)}>
                    {cert.status}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/employeedashboard/certificates/${cert.id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/employeedashboard/certificates/${cert.id}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificatesPage; 