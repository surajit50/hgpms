import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { debugPort } from "node:process";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const gpId = session.user.gpId;

    if (!gpId) {
      return NextResponse.json({ error: "GP ID not found" }, { status: 400 });
    }

    const warishApplication = await db.warishApplication.findFirst({
      where: {
        id,
        gpId,
      },
      include: {
        warishDetails: {
          include: {
            children: true,
          },
        },
        WarishDocument: true,
        gramPanchayat: {
          select: {
            name: true,
          },
        },
        createdByUser: {
          select: {
            name: true,
            email: true,
          },
        },
        updatedByUser: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!warishApplication) {
      return NextResponse.json(
        { error: "Warish application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(warishApplication);
  } catch (error) {
    console.error("Error fetching warish application:", error);
    return NextResponse.json(
      { error: "Failed to fetch warish application" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const gpId = session.user.gpId;
    const userId = session.user.id;

    if (!gpId) {
      return NextResponse.json({ error: "GP ID not found" }, { status: 400 });
    }

    // Check if application exists and belongs to this GP
    const existingApplication = await db.warishApplication.findFirst({
      where: {
        id,
        gpId,
      },
    });

    if (!existingApplication) {
      return NextResponse.json(
        { error: "Warish application not found" },
        { status: 404 }
      );
    }

    // Update warish application
    const updatedApplication = await db.warishApplication.update({
      where: { id },
      data: {
        ...body,
        updatedBy: userId,
        updatedAt: new Date(),
      },
      include: {
        warishDetails: {
          include: {
            children: true,
          },
        },
        WarishDocument: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating warish application:", error);
    return NextResponse.json(
      { error: "Failed to update warish application" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const gpId = session.user.gpId;
    const userId = session.user.id;

    if (!gpId) {
      return NextResponse.json({ error: "GP ID not found" }, { status: 400 });
    }

    // Check if application exists and belongs to this GP
    const existingApplication = await db.warishApplication.findFirst({
      where: {
        id,
        gpId,
      },
    });

    if (!existingApplication) {
      return NextResponse.json(
        { error: "Warish application not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {
      updatedBy: userId,
      updatedAt: new Date(),
    };

    // Handle status updates with timestamps
    if (body.warishApplicationStatus) {
      updateData.warishApplicationStatus = body.warishApplicationStatus;
      
      switch (body.warishApplicationStatus) {
        case "process":
          updateData.fieldreportRemark = body.fieldreportRemark || updateData.fieldreportRemark;
          break;
        case "approved":
          updateData.approvedBy = userId;
          updateData.approvedAt = new Date();
          updateData.warishRefNo = body.warishRefNo || updateData.warishRefNo;
          updateData.warishRefDate = body.warishRefDate ? new Date(body.warishRefDate) : updateData.warishRefDate;
          updateData.approvalYear = body.approvalYear || updateData.approvalYear;
          break;
        case "rejected":
          updateData.rejectedBy = userId;
          updateData.rejectedAt = new Date();
          updateData.adminNoteRemark = body.adminNoteRemark || updateData.adminNoteRemark;
          break;
      }
    }

    // Handle document verification
    if (body.warishdocumentverified !== undefined) {
      updateData.warishdocumentverified = body.warishdocumentverified;
    }

    // Handle other fields
    if (body.fieldreportRemark !== undefined) {
      updateData.fieldreportRemark = body.fieldreportRemark;
    }
    if (body.adminNoteRemark !== undefined) {
      updateData.adminNoteRemark = body.adminNoteRemark;
    }
    if (body.warishRefNo !== undefined) {
      updateData.warishRefNo = body.warishRefNo;
    }
    if (body.warishRefDate !== undefined) {
      updateData.warishRefDate = body.warishRefDate ? new Date(body.warishRefDate) : null;
    }
    if (body.approvalYear !== undefined) {
      updateData.approvalYear = body.approvalYear;
    }

    // Update warish application
    const updatedApplication = await db.warishApplication.update({
      where: { id },
      data: updateData,
      include: {
        warishDetails: {
          include: {
            children: true,
          },
        },
        WarishDocument: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating warish application:", error);
    return NextResponse.json(
      { error: "Failed to update warish application" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const gpId = session.user.gpId;

    if (!gpId) {
      return NextResponse.json({ error: "GP ID not found" }, { status: 400 });
    }

    // Check if application exists and belongs to this GP
    const existingApplication = await db.warishApplication.findFirst({
      where: {
        id,
        gpId,
      },
    });

    if (!existingApplication) {
      return NextResponse.json(
        { error: "Warish application not found" },
        { status: 404 }
      );
    }

    // Delete warish application (cascade will handle related records)
    await db.warishApplication.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Warish application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting warish application:", error);
    return NextResponse.json(
      { error: "Failed to delete warish application" },
      { status: 500 }
    );
  }
} 