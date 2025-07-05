import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

// Validation schemas
const createCertificateSchema = z.object({
  type: z.enum(["BIRTH", "DEATH", "MARRIAGE", "RESIDENCE"]),
  applicantName: z.string().min(1, "Applicant name is required"),
  applicantEmail: z.string().email("Valid email is required"),
  applicantPhone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(1, "Address is required"),
  dateOfEvent: z.string().min(1, "Date of event is required"),
  placeOfEvent: z.string().min(1, "Place of event is required"),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  spouseName: z.string().optional(),
  documents: z.array(z.string()).optional(),
  remarks: z.string().optional(),
});

const updateCertificateSchema = createCertificateSchema.partial();

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const status = searchParams.get("status") || "";

    const skip = (page - 1) * limit;

    // Build where clause based on user role and filters
    let whereClause: any = {};

    // Filter by Gram Panchayat for GP users
    if (session.user.role !== "SUPER_ADMIN" && session.user.gpId) {
      whereClause.gpId = session.user.gpId;
    }

    if (search) {
      whereClause.OR = [
        { applicantName: { contains: search, mode: "insensitive" } },
        { certificateNumber: { contains: search, mode: "insensitive" } },
      ];
    }

    if (type) {
      whereClause.type = type;
    }

    if (status) {
      whereClause.status = status;
    }

    const [certificates, total] = await Promise.all([
      db.certificate.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          gramPanchayat: {
            select: { name: true }
          }
        }
      }),
      db.certificate.count({ where: whereClause })
    ]);

    return NextResponse.json({
      certificates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only GP_ADMIN and GP_STAFF can create certificates
    if (!["GP_ADMIN", "GP_STAFF"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = createCertificateSchema.parse(body);

    // Generate certificate number
    const certificateNumber = await generateCertificateNumber(validatedData.type);

    const certificate = await db.certificate.create({
      data: {
        ...validatedData,
        certificateNumber,
        gpId: session.user.gpId!,
        status: "PENDING",
        createdBy: session.user.id,
      },
      include: {
        gramPanchayat: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating certificate:", error);
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}

async function generateCertificateNumber(type: string): Promise<string> {
  const prefix = type === "BIRTH" ? "BC" : 
                type === "DEATH" ? "DC" : 
                type === "MARRIAGE" ? "MC" : "RC";
  
  const year = new Date().getFullYear();
  const count = await db.certificate.count({
    where: {
      type,
      createdAt: {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1)
      }
    }
  });

  return `${prefix}-${year}-${String(count + 1).padStart(3, '0')}`;
} 