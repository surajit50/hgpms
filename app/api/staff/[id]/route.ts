import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { StaffUpdateSchema } from "@/schema";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user || !["SUPER_ADMIN", "GP_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Build where clause
    const whereClause: any = { id };

    // Filter by GP if user is GP_ADMIN
    if (session.user.role === "GP_ADMIN" && session.user.gpId) {
      whereClause.gpId = session.user.gpId;
    }

    const staffMember = await db.user.findUnique({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Don't include password or sensitive fields
      },
    });

    if (!staffMember) {
      return NextResponse.json(
        { error: "Staff member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: staffMember,
    });
  } catch (error) {
    console.error("Error fetching staff member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user || !["SUPER_ADMIN", "GP_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const validatedFields = StaffUpdateSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }

    const { name, email, phone, role, status } = validatedFields.data;

    // Build where clause
    const whereClause: any = { id };

    // Filter by GP if user is GP_ADMIN
    if (session.user.role === "GP_ADMIN" && session.user.gpId) {
      whereClause.gpId = session.user.gpId;
    }

    // Check if staff member exists
    const existingStaff = await db.user.findUnique({
      where: whereClause,
    });

    if (!existingStaff) {
      return NextResponse.json(
        { error: "Staff member not found" },
        { status: 404 }
      );
    }

    // Check if email is being changed and if it already exists
    if (email !== existingStaff.email) {
      const emailExists = await db.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {
      name,
      email,
      role,
      status,
    };

    // Add phone if provided
    if (phone !== undefined) {
      updateData.phone = phone;
    }

    // Update the staff member
    const updatedStaff = await db.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Don't return password or sensitive fields
      },
    });

    return NextResponse.json({
      success: true,
      message: "Staff member updated successfully",
      data: updatedStaff,
    });
  } catch (error) {
    console.error("Error updating staff member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user || !["SUPER_ADMIN", "GP_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Build where clause
    const whereClause: any = { id };

    // Filter by GP if user is GP_ADMIN
    if (session.user.role === "GP_ADMIN" && session.user.gpId) {
      whereClause.gpId = session.user.gpId;
    }

    // Check if staff member exists
    const existingStaff = await db.user.findUnique({
      where: whereClause,
    });

    if (!existingStaff) {
      return NextResponse.json(
        { error: "Staff member not found" },
        { status: 404 }
      );
    }

    // Prevent deleting the current user
    if (id === session.user.id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Delete the staff member
    await db.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Staff member deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting staff member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 