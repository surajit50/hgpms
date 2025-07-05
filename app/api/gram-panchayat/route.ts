import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { GramPanchayatSchema } from "@/schema";
import { hashPassword } from "@/lib/bcrypt";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedFields = GramPanchayatSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }

    const {
      name,
      district,
      state,
      contact,
      adminEmail,
      adminName,
      adminPassword,
    } = validatedFields.data;

    // Check if admin email already exists
    const existingUser = await db.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Admin email already exists" },
        { status: 400 }
      );
    }

    // Hash the admin password
    const hashedPassword = await hashPassword(adminPassword);

    // Create admin user first
    const adminUser = await db.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
        role: "GP_ADMIN",
        // Explicitly exclude stripeId to avoid unique constraint conflicts
        // stripeId will remain null/undefined until Stripe integration
      },
    });

    // Create Gram Panchayat
    const gramPanchayat = await db.gramPanchayat.create({
      data: {
        name,
        district,
        state,
        contact,
        adminUserId: adminUser.id,
      },
    });

    // Update admin user with gpId
    await db.user.update({
      where: { id: adminUser.id },
      data: { gpId: gramPanchayat.id },
    });

    return NextResponse.json({
      success: true,
      gramPanchayat: {
        id: gramPanchayat.id,
        name: gramPanchayat.name,
        district: gramPanchayat.district,
        state: gramPanchayat.state,
        contact: gramPanchayat.contact,
        adminUser: {
          id: adminUser.id,
          name: adminUser.name,
          email: adminUser.email,
        },
      },
    });
  } catch (error) {
    console.error("Error creating Gram Panchayat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 