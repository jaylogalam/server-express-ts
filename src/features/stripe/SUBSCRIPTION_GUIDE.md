# Stripe Subscriptions - Setup & Integration Guide

## 📋 Table of Contents

1. [Environment Setup](#environment-setup)
2. [Available Endpoints](#available-endpoints)
3. [Integration Flow](#integration-flow)
4. [Webhook Setup](#webhook-setup)
5. [Database Integration](#database-integration)
6. [Testing](#testing)

---

## 🔧 Environment Setup

Add these environment variables to your `.env` file:

```env
# Required
STRIPE_SECRET_KEY=sk_test_...

# Required for webhooks
STRIPE_WEBHOOK_SECRET=whsec_...
```

### How to get your keys:

1. **STRIPE_SECRET_KEY**: [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) → API keys
2. **STRIPE_WEBHOOK_SECRET**: [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks) → Add endpoint → Reveal signing secret

---

## 🚀 Available Endpoints

### Subscription Management

```bash
# Create a new subscription
POST /stripe/subscriptions/create
Body: {
  customer: "cus_xxx",
  items: [{ price: "price_xxx" }]
}

# Get subscription by ID
GET /stripe/subscriptions/retrieve/:subscriptionId

# Update subscription (upgrade/downgrade)
PATCH /stripe/subscriptions/update/:subscriptionId
Body: {
  items: [{ id: "si_xxx", price: "price_new" }]
}

# List all subscriptions
GET /stripe/subscriptions/list?customer=cus_xxx&status=active

# Cancel subscription
POST /stripe/subscriptions/cancel/:subscriptionId
Body: {
  prorate: true,  // Optional
  invoice_now: true  // Optional
}

# Resume paused subscription
POST /stripe/subscriptions/resume/:subscriptionId

# Get all subscriptions for a customer
GET /stripe/subscriptions/customer/:customerId
```

### Customer Portal (Recommended!)

```bash
# Create billing portal session
POST /stripe/subscriptions/portal
Body: {
  customer: "cus_xxx",
  return_url: "https://yourapp.com/account"
}

Response: {
  url: "https://billing.stripe.com/session/xxx"
}
```

**Note**: The portal allows customers to:

- Upgrade/downgrade plans
- Cancel subscriptions
- Update payment methods
- View invoices
- Update billing info

### Webhooks

```bash
# Receive Stripe events
POST /webhooks/stripe
```

This endpoint handles:

- `checkout.session.completed` - Customer completed checkout
- `customer.subscription.created` - New subscription created
- `customer.subscription.updated` - Subscription modified
- `customer.subscription.deleted` - Subscription cancelled
- `invoice.payment_succeeded` - Successful payment
- `invoice.payment_failed` - Failed payment

---

## 🔄 Integration Flow

### Creating a Subscription (Complete Flow)

#### 1. Create Stripe Product & Price

```typescript
// Create a product
const product = await fetch("http://localhost:3000/stripe/products/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Pro Plan",
    description: "Premium features for professionals",
  }),
});

// Create a price
const price = await fetch("http://localhost:3000/stripe/prices/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    product: product.id,
    unit_amount: 2999, // $29.99
    currency: "usd",
    recurring: {
      interval: "month",
    },
  }),
});
```

#### 2. Create Checkout Session

```typescript
const session = await fetch(
  "http://localhost:3000/stripe/checkout-sessions/create",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode: "subscription",
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      success_url:
        "https://yourapp.com/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://yourapp.com/cancel",
      customer_email: "customer@example.com", // Optional
    }),
  }
);

// Redirect user to checkout
window.location.href = session.url;
```

#### 3. Handle Checkout Completion

The webhook (`/webhooks/stripe`) will receive `checkout.session.completed` event:

```typescript
// In your webhook handler (already implemented)
async function handleCheckoutSessionCompleted(session) {
  // Extract data
  const customerId = session.customer;
  const subscriptionId = session.subscription;
  const customerEmail = session.customer_email;

  // TODO: Update your database
  // - Create/update user record
  // - Store customerId and subscriptionId
  // - Grant access to paid features
}
```

#### 4. Manage Subscriptions

Use the billing portal for user self-service:

```typescript
const portalSession = await fetch(
  "http://localhost:3000/stripe/subscriptions/portal",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer: customerId,
      return_url: "https://yourapp.com/account",
    }),
  }
);

// Redirect to portal
window.location.href = portalSession.url;
```

---

## 🔔 Webhook Setup

### 1. Configure Stripe Webhook

Go to [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks):

1. Click **Add endpoint**
2. Enter endpoint URL: `https://your-domain.com/webhooks/stripe`
3. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Click **Add endpoint**
5. Copy the **Signing secret** → Add to `.env` as `STRIPE_WEBHOOK_SECRET`

### 2. Webhook Handlers (Already Implemented!)

Located in `src/features/stripe/routes/stripe-webhook.routers.ts`:

```typescript
// You need to implement these TODO sections:

async function handleCheckoutSessionCompleted(session) {
  // TODO: Update your database
  // - Create user account
  // - Store customer ID and subscription ID
  // - Send confirmation email
}

async function handleSubscriptionCreated(subscription) {
  // TODO: Update your database
  // - Mark user as subscribed
  // - Store subscription details
}

async function handleSubscriptionUpdated(subscription) {
  // TODO: Handle plan changes
  // - Update user's plan in database
  // - Adjust feature access
}

async function handleSubscriptionDeleted(subscription) {
  // TODO: Handle cancellation
  // - Revoke access to paid features
  // - Send cancellation email
}

async function handleInvoicePaymentSucceeded(invoice) {
  // TODO: Handle successful payment
  // - Extend subscription period
  // - Send receipt
}

async function handleInvoicePaymentFailed(invoice) {
  // TODO: Handle failed payment
  // - Notify user
  // - Request payment method update
}
```

### 3. Test Webhooks Locally

Use Stripe CLI for local testing:

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/webhooks/stripe

# This will output a webhook signing secret
# Add it to your .env as STRIPE_WEBHOOK_SECRET

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.created
```

---

## 💾 Database Integration

### Recommended Database Schema

You'll need to store subscription data. Here's a suggested schema:

```typescript
// User model (extend your existing user model)
interface User {
  id: string;
  email: string;
  // ... other fields

  // Stripe fields
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus?: "active" | "canceled" | "past_due" | "trialing";
  subscriptionPlanId?: string;
  subscriptionCurrentPeriodEnd?: Date;
}

// Or create a separate Subscription model
interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  status: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Integration Example

```typescript
// In handleCheckoutSessionCompleted
async function handleCheckoutSessionCompleted(session) {
  // Get or create user
  const user = await User.findOneAndUpdate(
    { email: session.customer_email },
    {
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      subscriptionStatus: "active",
    },
    { upsert: true, new: true }
  );

  console.log("✅ User subscription activated:", user.id);
}

// In handleSubscriptionUpdated
async function handleSubscriptionUpdated(subscription) {
  await User.findOneAndUpdate(
    { stripeCustomerId: subscription.customer },
    {
      subscriptionStatus: subscription.status,
      subscriptionCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000
      ),
    }
  );

  console.log("✅ Subscription updated:", subscription.id);
}

// In handleSubscriptionDeleted
async function handleSubscriptionDeleted(subscription) {
  await User.findOneAndUpdate(
    { stripeCustomerId: subscription.customer },
    {
      subscriptionStatus: "canceled",
      stripeSubscriptionId: null,
    }
  );

  console.log("✅ Subscription cancelled:", subscription.id);
}
```

---

## 🧪 Testing

### Test Credit Cards

Use these test cards in Stripe test mode:

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155

Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Test Flow

1. **Create a test product and price**:

```bash
curl -X POST http://localhost:3000/stripe/products/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Pro Plan",
    "description": "Test subscription"
  }'

curl -X POST http://localhost:3000/stripe/prices/create \
  -H "Content-Type: application/json" \
  -d '{
    "product": "prod_xxx",
    "unit_amount": 1000,
    "currency": "usd",
    "recurring": { "interval": "month" }
  }'
```

2. **Create checkout session**:

```bash
curl -X POST http://localhost:3000/stripe/checkout-sessions/create \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "subscription",
    "line_items": [{ "price": "price_xxx", "quantity": 1 }],
    "success_url": "http://localhost:3000/success",
    "cancel_url": "http://localhost:3000/cancel"
  }'
```

3. **Visit the checkout URL** and complete with test card

4. **Check webhook logs** to see events received

5. **Verify database** was updated correctly

---

## 📚 Additional Resources

- [Stripe Subscriptions Documentation](https://stripe.com/docs/billing/subscriptions/overview)
- [Stripe API Reference](https://stripe.com/docs/api/subscriptions)
- [Testing Stripe](https://stripe.com/docs/testing)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)
