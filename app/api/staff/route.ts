import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { StaffCreateSchema, StaffQuerySchema } from "@/schema";
import { hashPassword } from "@/lib/bcrypt";
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const gpId = searchParams.get('gpId');

    if (!gpId) {
      return NextResponse.json({ error: 'Gram Panchayat ID is required' }, { status: 400 });
    }

    const staffMembers = await db.user.findMany({
      where: {
        gramPanchayat: { id: gpId },
        role: { in: ['GP_STAFF', 'GP_ADMIN'] }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        updatedAt: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    // Transform the data to match the frontend interface
    const transformedStaff = staffMembers.map(staff => ({
      id: staff.id,
      name: staff.name || 'Unknown',
      email: staff.email,
      role: staff.role === "GP_ADMIN" ? 'Administrator' : 'Staff Member',
      status: staff.status || 'ACTIVE',
      lastActive: formatLastActive(staff.updatedAt)
    }));

    return NextResponse.json({ staff: transformedStaff });
  } catch (error) {
    console.error('Error fetching staff members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch staff members' },
      { status: 500 }
    );
  }
}

function formatLastActive(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !["SUPER_ADMIN", "GP_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedFields = StaffCreateSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }

    const { name, email, phone, role, password } = validatedFields.data;

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Prepare user data
    const userData: any = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    // Add phone if provided
    if (phone) {
      userData.phone = phone;
    }

    // Add gpId if user is GP_ADMIN
    if (session.user.role === "GP_ADMIN" && session.user.gpId) {
      userData.gpId = session.user.gpId;
    }

    // Create the staff member
    const newStaff = await db.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        // Don't return password or sensitive fields
      },
    });

    return NextResponse.json({
      success: true,
      message: "Staff member created successfully",
      data: newStaff,
    });
  } catch (error) {
    console.error("Error creating staff member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 