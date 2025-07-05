const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setupStripePrices() {
  console.log('Setting up Stripe prices for plans...\n');

  try {
    // Get all active plans
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { price: 'asc' }
    });

    console.log('Current plans:');
    plans.forEach(plan => {
      console.log(`- ${plan.name}: ₹${plan.price}/month`);
      console.log(`  Stripe Price ID: ${plan.stripePriceId || 'NOT SET'}`);
      console.log('');
    });

    console.log('To fix the Stripe price error:');
    console.log('1. Go to your Stripe Dashboard → Products');
    console.log('2. Create products for each subscription plan');
    console.log('3. Set up recurring prices (monthly billing)');
    console.log('4. Copy the Price IDs (starts with "price_")');
    console.log('5. Update the database using the API endpoint:');
    console.log('');
    console.log('Example API calls:');
    console.log('');
    
    plans.forEach(plan => {
      console.log(`# Update ${plan.name}`);
      console.log(`curl -X POST http://localhost:3000/api/payment/setup-prices \\`);
      console.log(`  -H "Content-Type: application/json" \\`);
      console.log(`  -d '{"planId": "${plan.id}", "stripePriceId": "price_YOUR_STRIPE_PRICE_ID"}'`);
      console.log('');
    });

    console.log('Or use the admin interface at:');
    console.log('http://localhost:3000/admindashboard/billing');
    console.log('');
    console.log('Make sure you are logged in as a SUPER_ADMIN user.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupStripePrices(); 