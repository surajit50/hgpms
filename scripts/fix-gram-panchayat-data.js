const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixGramPanchayatData() {
  console.log('Fixing Gram Panchayat data...\n');

  try {
    // Find all Gram Panchayats with null values
    const gramPanchayatsWithNullData = await prisma.gramPanchayat.findMany({
      where: {
        OR: [
          { adminName: null },
          { adminEmail: null },
          { adminPhone: null },
          { address: null },
          { contact: null }
        ]
      }
    });

    console.log(`Found ${gramPanchayatsWithNullData.length} Gram Panchayats with null data`);

    if (gramPanchayatsWithNullData.length === 0) {
      console.log('No Gram Panchayats need fixing!');
      return;
    }

    // Update each Gram Panchayat with default values
    for (const gp of gramPanchayatsWithNullData) {
      console.log(`Fixing: ${gp.name} (${gp.district}, ${gp.state})`);

      await prisma.gramPanchayat.update({
        where: { id: gp.id },
        data: {
          adminName: gp.adminName || "Admin Not Assigned",
          adminEmail: gp.adminEmail || "admin@example.com",
          adminPhone: gp.adminPhone || "0000000000",
          address: gp.address || "Address Not Available",
          contact: gp.contact || "Contact Not Available"
        }
      });
    }

    console.log('\n✅ All Gram Panchayats have been updated!');

    // Verify the fix
    const remainingNulls = await prisma.gramPanchayat.findMany({
      where: {
        OR: [
          { adminName: null },
          { adminEmail: null },
          { adminPhone: null },
          { address: null },
          { contact: null }
        ]
      }
    });

    if (remainingNulls.length === 0) {
      console.log('✅ Verification passed: No null values remain');
    } else {
      console.log(`⚠️  Warning: ${remainingNulls.length} records still have null values`);
    }

  } catch (error) {
    console.error('Error fixing Gram Panchayat data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixGramPanchayatData(); 