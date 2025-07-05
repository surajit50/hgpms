import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Feature } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only SUPER_ADMIN can view features
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get all available features from the Feature enum
    const features = Object.values(Feature).map(feature => ({
      value: feature,
      label: getFeatureLabel(feature),
      description: getFeatureDescription(feature),
    }));

    return NextResponse.json({ features });
  } catch (error) {
    console.error("Error fetching features:", error);
    return NextResponse.json(
      { error: "Failed to fetch features" },
      { status: 500 }
    );
  }
}

function getFeatureLabel(feature: Feature): string {
  const labels: Record<Feature, string> = {
    CERTIFICATE_MGMT: "Certificate Management",
    SCHEME_TRACKING: "Scheme Tracking",
    WATER_MGMT: "Water Management",
    ASSET_MGMT: "Asset Management",
    DOCUMENT_UPLOAD: "Document Upload",
    MULTI_STAFF: "Multi Staff",
    REPORT_ANALYTICS: "Report Analytics",
    API_ACCESS: "API Access",
    WHITE_LABEL: "White Label",
  };
  return labels[feature];
}

function getFeatureDescription(feature: Feature): string {
  const descriptions: Record<Feature, string> = {
    CERTIFICATE_MGMT: "Issue and manage birth/death certificates",
    SCHEME_TRACKING: "Track government welfare schemes",
    WATER_MGMT: "Monitor drinking water supply and quality",
    ASSET_MGMT: "Track roads, drainage, and public assets",
    DOCUMENT_UPLOAD: "Upload supporting documents for records",
    MULTI_STAFF: "Add multiple staff members to your GP",
    REPORT_ANALYTICS: "Generate detailed analytics and reports",
    API_ACCESS: "Access to API endpoints",
    WHITE_LABEL: "Custom branding options",
  };
  return descriptions[feature];
} 