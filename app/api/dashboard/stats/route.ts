import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get the current user's Gram Panchayat ID from the session
    // For now, we'll use a default or get from query params
    const searchParams = request.nextUrl.searchParams;
    const gpId = searchParams.get('gpId');

    if (!gpId) {
      return NextResponse.json({ error: 'Gram Panchayat ID is required' }, { status: 400 });
    }

    // Fetch statistics from database
    const [
      totalStaff,
      pendingCertificates,
      activeSchemes,
      waterReports,
      assets
    ] = await Promise.all([
      // Total population (sum of all ward populations)
     
      
      // Total staff members
      db.user.count({
        where: { 
          gramPanchayat: { id: gpId },
          role: { in: ['GP_STAFF', 'GP_ADMIN'] }
        }
      }),
      
      // Pending certificates
      db.certificate.count({
        where: { 
          gramPanchayat: { id: gpId },
          status: 'PENDING'
        }
      }),
      
      // Active schemes
      db.scheme.count({
        where: { 
          gramPanchayat: { id: gpId },
          status: 'ACTIVE'
        }
      }),
      
      // Water reports
      db.waterReport.count({
        where: { gramPanchayat: { id: gpId } }
      }),
      
      // Assets
      db.asset.count({
        where: { gramPanchayat: { id: gpId } }
      })
    ]);

    const stats = {
      totalPopulation: totalPopulation._sum.population || 0,
      totalWards,
      totalStaff,
      pendingCertificates,
      activeSchemes,
      waterReports,
      assets
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
} 