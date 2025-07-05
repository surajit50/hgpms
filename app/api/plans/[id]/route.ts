import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const updatePlanSchema = z.object({
  name: z.string().min(1, "Plan name is required").optional(),
  price: z.number().positive("Price must be positive").optional(),
  duration: z.number().positive("Duration must be positive").optional(),
  features: z.array(z.string()).min(1, "At least one feature is required").optional(),
  stripePriceId: z.string().min(1, "Stripe price ID is required").optional(),
  isActive: z.boolean().optional(),
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

    // Only SUPER_ADMIN can view plans
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const plan = await db.plan.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            subscriptions: true
          }
        },
        subscriptions: {
          include: {
            gramPanchayat: {
              select: { name: true }
            }
          }
        }
      }
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Error fetching plan:", error);
    return NextResponse.json(
      { error: "Failed to fetch plan" },
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

    // Only SUPER_ADMIN can update plans
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = updatePlanSchema.parse(body);

    const plan = await db.plan.findUnique({
      where: { id: params.id }
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Check if name is being changed and if it conflicts
    if (validatedData.name && validatedData.name !== plan.name) {
      const existingPlan = await db.plan.findUnique({
        where: { name: validatedData.name }
      });

      if (existingPlan) {
        return NextResponse.json(
          { error: "Plan with this name already exists" },
          { status: 400 }
        );
      }
    }

    // Check if stripe price ID is being changed and if it conflicts
    if (validatedData.stripePriceId && validatedData.stripePriceId !== plan.stripePriceId) {
      const existingStripePrice = await db.plan.findUnique({
        where: { stripePriceId: validatedData.stripePriceId }
      });

      if (existingStripePrice) {
        return NextResponse.json(
          { error: "Stripe price ID already exists" },
          { status: 400 }
        );
      }
    }

    const updatedPlan = await db.plan.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        features: validatedData.features || plan.features,
      },
      include: {
        _count: {
          select: {
            subscriptions: true
          }
        }
      }
    });

    return NextResponse.json(updatedPlan);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating plan:", error);
    return NextResponse.json(
      { error: "Failed to update plan" },
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

    // Only SUPER_ADMIN can delete plans
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const plan = await db.plan.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            subscriptions: true
          }
        }
      }
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Check if plan has active subscriptions
    if (plan._count.subscriptions > 0) {
      return NextResponse.json(
        { error: "Cannot delete plan with active subscriptions" },
        { status: 400 }
      );
    }

    await db.plan.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting plan:", error);
    return NextResponse.json(
      { error: "Failed to delete plan" },
      { status: 500 }
    );
  }
} 