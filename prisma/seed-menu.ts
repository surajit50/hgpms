import { PrismaClient, UserRole, Feature } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed permissions (add more as needed)
  await prisma.permission.createMany({
    data: [
      { name: "CAN_VIEW_DASHBOARD", description: "View dashboard" },
      { name: "CAN_MANAGE_USERS", description: "Manage user accounts" },
      { name: "CAN_VIEW_REPORTS", description: "View reports and analytics" },
      { name: "CAN_MANAGE_CERTIFICATES", description: "Manage certificates" },
      // ...add more permissions as needed
    ],
    skipDuplicates: true,
  });

  // Seed admin dashboard menu
  const adminDashboard = await prisma.menu.create({
    data: {
      label: "Admin Dashboard",
      link: "/admindashboard/home",
      icon: "MdDashboard",
      color: "text-blue-500",
      roles: [UserRole.GP_ADMIN],
      feature: null,
      order: 1,
    },
  });

  // Seed a nested menu under admin dashboard
  const certAdmin = await prisma.menu.create({
    data: {
      label: "Certificate Administration",
      icon: "MdDashboard",
      color: "text-red-500",
      roles: [UserRole.GP_ADMIN],
      feature: Feature.CERTIFICATE_MGMT,
      parentId: adminDashboard.id,
      order: 2,
    },
  });

  // Seed employee dashboard menu
  const employeeDashboard = await prisma.menu.create({
    data: {
      label: "Employee Dashboard",
      link: "/employeedashboard/home",
      icon: "MdDashboard",
      color: "text-blue-500",
      roles: [UserRole.GP_STAFF],
      feature: null,
      order: 1,
    },
  });

  // Seed a nested menu under employee dashboard
  await prisma.menu.create({
    data: {
      label: "Certificate Processing",
      icon: "MdAssignment",
      color: "text-red-500",
      roles: [UserRole.GP_STAFF],
      feature: Feature.CERTIFICATE_MGMT,
      parentId: employeeDashboard.id,
      order: 2,
    },
  });

  // Seed super admin dashboard menu
  const superAdminDashboard = await prisma.menu.create({
    data: {
      label: "System Administration",
      icon: "MdPeople",
      color: "text-blue-500",
      roles: [UserRole.SUPER_ADMIN],
      feature: null,
      order: 1,
    },
  });

  // Seed a nested menu under super admin dashboard
  await prisma.menu.create({
    data: {
      label: "User Accounts",
      link: "/superadmindashboard/user",
      icon: "FaChevronCircleRight",
      color: "text-green-500",
      roles: [UserRole.SUPER_ADMIN],
      feature: null,
      parentId: superAdminDashboard.id,
      order: 2,
    },
  });

  // ...repeat for all menu items and sub-items, using parentId for nesting
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 