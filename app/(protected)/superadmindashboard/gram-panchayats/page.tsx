"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Building2, 
  Users, 
  MapPin, 
  Calendar,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Phone,
  Mail,
  Crown,
  Shield,
  Activity
} from "lucide-react";
import Link from "next/link";

interface GramPanchayat {
  id: string;
  name: string;
  district: string;
  state: string;
  contact: string;
  adminName: string;
  adminEmail: string;
  population?: number;
  wards?: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  subscriptionStatus?: "ACTIVE" | "TRIALING" | "PAST_DUE" | "CANCELED";
}

const GramPanchayatsPage = () => {
  const [gramPanchayats, setGramPanchayats] = useState<GramPanchayat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGramPanchayats();
  }, []);

  const fetchGramPanchayats = async () => {
    try {
      // Mock data - replace with actual API call
      const mockData: GramPanchayat[] = [
        {
          id: "1",
          name: "Hili Gram Panchayat",
          district: "North 24 Parganas",
          state: "West Bengal",
          contact: "+91 98765 43210",
          adminName: "Amit Kumar",
          adminEmail: "amit@hili-gp.in",
          population: 15420,
          wards: 12,
          status: "ACTIVE",
          createdAt: "2024-01-15",
          subscriptionStatus: "ACTIVE",
        },
        {
          id: "2",
          name: "Kolkata Gram Panchayat",
          district: "Kolkata",
          state: "West Bengal",
          contact: "+91 98765 43211",
          adminName: "Priya Patel",
          adminEmail: "priya@kolkata-gp.in",
          population: 22340,
          wards: 15,
          status: "ACTIVE",
          createdAt: "2024-01-20",
          subscriptionStatus: "TRIALING",
        },
        {
          id: "3",
          name: "Mumbai Gram Panchayat",
          district: "Mumbai",
          state: "Maharashtra",
          contact: "+91 98765 43212",
          adminName: "Rahul Sharma",
          adminEmail: "rahul@mumbai-gp.in",
          population: 18760,
          wards: 10,
          status: "INACTIVE",
          createdAt: "2024-01-10",
          subscriptionStatus: "PAST_DUE",
        },
      ];

      setGramPanchayats(mockData);
    } catch (error) {
      console.error("Error fetching Gram Panchayats:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGramPanchayats = gramPanchayats.filter(gp =>
    gp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gp.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gp.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gram Panchayats</h1>
          <p className="text-gray-600 mt-2">Manage all Gram Panchayats in the system</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button asChild>
            <Link href="/superadmindashboard/createGP">
              <Plus className="w-4 h-4 mr-2" />
              Add Gram Panchayat
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gram Panchayats</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gramPanchayats.length}</div>
            <p className="text-xs text-muted-foreground">
              Registered in system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Gram Panchayats</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gramPanchayats.filter(gp => gp.status === "ACTIVE").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Population</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gramPanchayats.reduce((sum, gp) => sum + (gp.population || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all Gram Panchayats
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gramPanchayats.filter(gp => gp.subscriptionStatus === "ACTIVE").length}
            </div>
            <p className="text-xs text-muted-foreground">
              With active subscriptions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Gram Panchayats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, district, or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gram Panchayats Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Gram Panchayats</CardTitle>
          <CardDescription>
            Manage and monitor all registered Gram Panchayats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gram Panchayat</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Population</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGramPanchayats.map((gp) => (
                <TableRow key={gp.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{gp.name}</div>
                        <div className="text-sm text-gray-500">
                          Created {new Date(gp.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">{gp.district}</div>
                        <div className="text-xs text-gray-500">{gp.state}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium">{gp.adminName}</div>
                      <div className="text-xs text-gray-500">{gp.adminEmail}</div>
                      <div className="text-xs text-gray-400 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {gp.contact}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium">
                        {gp.population?.toLocaleString() || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {gp.wards} wards
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={gp.status === "ACTIVE" ? "default" : "secondary"}>
                      {gp.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        gp.subscriptionStatus === "ACTIVE" ? "default" :
                        gp.subscriptionStatus === "TRIALING" ? "secondary" :
                        "destructive"
                      }
                    >
                      {gp.subscriptionStatus || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/superadmindashboard/gram-panchayats/${gp.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GramPanchayatsPage; 