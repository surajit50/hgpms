import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const gpId = searchParams.get('gpId');

    if (!gpId) {
      return NextResponse.json({ error: 'Gram Panchayat ID is required' }, { status: 400 });
    }

    // Fetch recent activities from different tables
    const [
      recentCertificates,
      recentSchemes,
      recentWaterReports,
      recentAssets
    ] = await Promise.all([
      // Recent certificates
      db.certificate.findMany({
        where: { gramPanchayat: { id: gpId } },
        select: {
          id: true,
          type: true,
          applicantName: true,
          status: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      
      // Recent schemes
      db.scheme.findMany({
        where: { gramPanchayat: { id: gpId } },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      
      // Recent water reports
      db.waterReport.findMany({
        where: { gramPanchayat: { id: gpId } },
        select: {
          id: true,
          
          description: true,
          status: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      
      // Recent assets
      db.asset.findMany({
        where: { gramPanchayat: { id: gpId } },
        select: {
          id: true,
          name: true,
          type: true,
          
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      })
    ]);

    // Combine and transform all activities
    const activities = [
      ...recentCertificates.map(cert => ({
        id: `cert-${cert.id}`,
        type: 'certificate',
        title: `${cert.type} Certificate ${cert.status === 'APPROVED' ? 'Issued' : 'Requested'}`,
        description: `Certificate for ${cert.applicantName}`,
        timestamp: formatTimestamp(cert.createdAt),
        status: cert.status.toLowerCase()
      })),
      
      ...recentSchemes.map(scheme => ({
        id: `scheme-${scheme.id}`,
        type: 'scheme',
        title: `${scheme.name} Scheme`,
        description: scheme.description || 'Scheme updated',
        timestamp: formatTimestamp(scheme.createdAt),
        status: scheme.status.toLowerCase()
      })),
      
      ...recentWaterReports.map(report => ({
        id: `water-${report.id}`,
        type: 'water',
       
       
        timestamp: formatTimestamp(report.createdAt),
        
      })),
      
      ...recentAssets.map(asset => ({
        id: `asset-${asset.id}`,
        type: 'asset',
        title: `${asset.type} Asset Added`,
        description: asset.name,
        timestamp: formatTimestamp(asset.createdAt),
        status: asset.status.toLowerCase()
      }))
    ];

    // Sort by creation date (most recent first) and take top 10
    const sortedActivities = activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    return NextResponse.json({ activities: sortedActivities });
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent activity' },
      { status: 500 }
    );
  }
}

function formatTimestamp(date: Date): string {
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