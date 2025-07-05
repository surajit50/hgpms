"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  UserPlus,
  Search,
  Eye,
  Edit,
  Trash2,
  Shield,
  Crown,
  User,
  Mail,
  Phone,
  Calendar,
  Building2,
  Activity,
  CheckCircle,
  XCircle
} from "lucide-react";
import Link from "next/link";

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "GP_ADMIN" | "GP_STAFF";
  status: "ACTIVE" | "INACTIVE";
  gpName?: string;
  phone?: string;
  lastActive: string;
  createdAt: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Mock data - replace with actual API call
      const mockData: SystemUser[] = [
        {
          id: "1",
          name: "Super Admin",
          email: "admin@hgpms.com",
          role: "SUPER_ADMIN",
          status: "ACTIVE",
          lastActive: "2 hours ago",
          createdAt: "2024-01-01",
        },
        {
          id: "2",
          name: "Amit Kumar",
          email: "amit@hili-gp.in",
          role: "GP_ADMIN",
          status: "ACTIVE",
          gpName: "Hili Gram Panchayat",
          phone: "+91 98765 43210",
          lastActive: "30 minutes ago",
          createdAt: "2024-01-15",
        },
        {
          id: "3",
          name: "Priya Patel",
          email: "priya@kolkata-gp.in",
          role: "GP_ADMIN",
          status: "ACTIVE",
          gpName: "Kolkata Gram Panchayat",
          phone: "+91 98765 43211",
          lastActive: "1 day ago",
          createdAt: "2024-01-20",
        },
        {
          id: "4",
          name: "Rahul Sharma",
          email: "rahul@hili-gp.in",
          role: "GP_STAFF",
          status: "ACTIVE",
          gpName: "Hili Gram Panchayat",
          phone: "+91 98765 43212",
          lastActive: "2 hours ago",
          createdAt: "2024-01-25",
        },
        {
          id: "5",
          name: "Sita Devi",
          email: "sita@kolkata-gp.in",
          role: "GP_STAFF",
          status: "INACTIVE",
          gpName: "Kolkata Gram Panchayat",
          phone: "+91 98765 43213",
          lastActive: "1 week ago",
          createdAt: "2024-01-30",
        },
      ];

      setUsers(mockData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.gpName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return <Crown className="w-4 h-4 text-purple-600" />;
      case "GP_ADMIN":
        return <Shield className="w-4 h-4 text-blue-600" />;
      case "GP_STAFF":
        return <User className="w-4 h-4 text-green-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return <Badge variant="default" className="bg-purple-500">Super Admin</Badge>;
      case "GP_ADMIN":
        return <Badge variant="default" className="bg-blue-500">GP Admin</Badge>;
      case "GP_STAFF":
        return <Badge variant="default" className="bg-green-500">Staff</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">System Users</h1>
          <p className="text-gray-600 mt-2">Manage all users across the system</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(user => user.status === "ACTIVE").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GP Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(user => user.role === "GP_ADMIN").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Gram Panchayat administrators
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(user => user.role === "GP_STAFF").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Staff members
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by name, email, or Gram Panchayat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage and monitor all system users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Gram Panchayat</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {getRoleIcon(user.role)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    {user.gpName ? (
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm">{user.gpName}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">System User</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.phone ? (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "ACTIVE" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">{user.lastActive}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
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

export default UsersPage; 