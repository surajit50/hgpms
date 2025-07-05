# Stripe Payment Integration Setup

This guide will help you set up Stripe payment processing for the Gram Panchayat Management System.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

## Stripe Dashboard Setup

1. **Create a Stripe Account**
   - Go to [stripe.com](https://stripe.com) and create an account
   - Switch to test mode for development

2. **Get API Keys**
   - Go to Developers > API keys in your Stripe dashboard
   - Copy the "Secret key" and "Publishable key"
   - Update your environment variables

3. **Create Products and Prices**
   - Go to Products in your Stripe dashboard
   - Create products for each subscription plan:
     - Basic Plan (₹999/month)
     - Professional Plan (₹1999/month)
     - Enterprise Plan (₹3999/month)
   - For each product, create a recurring price (monthly)
   - Copy the Price IDs (starts with `price_`)

4. **Update Database with Stripe Price IDs**
   - Update the `stripePriceId` field in your plans table
   - Example:
     ```sql
     UPDATE plans SET stripePriceId = 'price_your_basic_plan_id' WHERE name = 'Basic Plan';
     ```

5. **Set Up Webhooks**
   - Go to Developers > Webhooks in your Stripe dashboard
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `invoice.payment_succeeded`
     - `customer.subscription.updated`
   - Copy the webhook signing secret to your environment variables

## Testing the Integration

1. **Test Mode**
   - Use Stripe test cards for testing:
     - Success: `4242 4242 4242 4242`
     - Decline: `4000 0000 0000 0002`

2. **Test Flow**
   - Go to `/admindashboard/billing`
   - Select a plan and click "Subscribe Now"
   - Complete the payment with test card
   - Verify subscription is created in database

## Production Deployment

1. **Switch to Live Mode**
   - Get live API keys from Stripe dashboard
   - Update environment variables
   - Update webhook endpoint URL

2. **Security**
   - Ensure webhook signature verification is working
   - Use HTTPS in production
   - Monitor webhook events in Stripe dashboard

## Troubleshooting

- **Webhook Issues**: Check webhook logs in Stripe dashboard
- **Payment Failures**: Verify Stripe price IDs are correct
- **Database Errors**: Ensure Prisma schema is up to date

## Support

For Stripe-specific issues, refer to the [Stripe Documentation](https://stripe.com/docs). 