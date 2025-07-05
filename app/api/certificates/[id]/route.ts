import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const updateCertificateSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "ISSUED"]).optional(),
  issueDate: z.string().optional(),
  remarks: z.string().optional(),
  documents: z.array(z.string()).optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const certificate = await db.certificate.findUnique({
      where: { id: params.id },
      include: {
        gramPanchayat: {
          select: { name: true }
        }
      }
    });

    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    // Check access permissions
    if (session.user.role !== "SUPER_ADMIN" && certificate.gpId !== session.user.gpId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificate" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only GP_ADMIN can update certificates
    if (session.user.role !== "GP_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = updateCertificateSchema.parse(body);

    const certificate = await db.certificate.findUnique({
      where: { id: params.id }
    });

    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    // Check if certificate belongs to user's GP
    if (certificate.gpId !== session.user.gpId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedCertificate = await db.certificate.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        updatedBy: session.user.id,
        updatedAt: new Date(),
      },
      include: {
        gramPanchayat: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json(updatedCertificate);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating certificate:", error);
    return NextResponse.json(
      { error: "Failed to update certificate" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only GP_ADMIN can delete certificates
    if (session.user.role !== "GP_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const certificate = await db.certificate.findUnique({
      where: { id: params.id }
    });

    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    // Check if certificate belongs to user's GP
    if (certificate.gpId !== session.user.gpId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.certificate.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    console.error("Error deleting certificate:", error);
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
} 