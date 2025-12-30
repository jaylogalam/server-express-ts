# Stripe Feature - Quick Reference

Complete Stripe integration with services and routers for Products, Prices, Checkout Sessions, Payment Links, and Webhook Endpoints.

---

## ⚠️ Important Notes

> **Environment Variable**: Requires `STRIPE_SECRET_KEY` in your `.env` file

> **Price Immutability**: Cannot change `unit_amount` or `currency` after creation

> **Product Deletion**: Products are archived, not permanently deleted

> **Session Expiration**: Checkout sessions auto-expire after 24 hours unless completed

> **Payment Links**: Shareable URLs for accepting payments without building custom checkout

> **Webhook Endpoints**: Configure endpoints to receive event notifications from Stripe

---

## 🚀 Endpoints Overview

### Products: `/stripe/products`

```bash
POST   /stripe/products/create          # Create product
GET    /stripe/products/retrieve/:id    # Retrieve product
PATCH  /stripe/products/update/:id      # Update product
DELETE /stripe/products/delete/:id      # Delete product
GET    /stripe/products/list            # List products
GET    /stripe/products/search          # Search products
```

### Prices: `/stripe/prices`

```bash
POST   /stripe/prices/create            # Create price
GET    /stripe/prices/retrieve/:id      # Retrieve price
PATCH  /stripe/prices/update/:id        # Update price (metadata only)
GET    /stripe/prices/list              # List prices
GET    /stripe/prices/search            # Search prices
```

### Checkout Sessions: `/stripe/checkout-sessions`

```bash
POST   /stripe/checkout-sessions/create          # Create checkout session
GET    /stripe/checkout-sessions/retrieve/:id    # Retrieve session
PATCH  /stripe/checkout-sessions/update/:id      # Update session
GET    /stripe/checkout-sessions/list            # List sessions
POST   /stripe/checkout-sessions/expire/:id      # Expire session
```

### Payment Links: `/stripe/payment-links`

```bash
POST   /stripe/payment-links/create         # Create payment link
GET    /stripe/payment-links/retrieve/:id   # Retrieve payment link
PATCH  /stripe/payment-links/update/:id     # Update payment link
GET    /stripe/payment-links/list           # List payment links
GET    /stripe/payment-links/line-items/:id # Get line items
```

### Webhook Endpoints: `/stripe/webhooks`

```bash
POST   /stripe/webhooks/create          # Create webhook endpoint
GET    /stripe/webhooks/read/:id        # Retrieve webhook endpoint
PATCH  /stripe/webhooks/update/:id      # Update webhook endpoint
DELETE /stripe/webhooks/delete/:id      # Delete webhook endpoint
GET    /stripe/webhooks/list            # List webhook endpoints
```

### Subscriptions: `/stripe/subscriptions`

```bash
POST   /stripe/subscriptions/create              # Create subscription
GET    /stripe/subscriptions/retrieve/:id        # Retrieve subscription
PATCH  /stripe/subscriptions/update/:id          # Update subscription
GET    /stripe/subscriptions/list                # List subscriptions
POST   /stripe/subscriptions/cancel/:id          # Cancel subscription
POST   /stripe/subscriptions/resume/:id          # Resume subscription
GET    /stripe/subscriptions/customer/:customerId  # Get customer subscriptions
POST   /stripe/subscriptions/portal              # Create billing portal session
```

### Stripe Webhook Handler: `/webhooks`

```bash
POST   /webhooks/stripe                 # Receive Stripe webhook events
```

> **⚠️ Critical Setup Required**:
>
> - Add `STRIPE_WEBHOOK_SECRET` to your `.env` file
> - This endpoint must use raw body parsing for signature verification
> - Configure in `server.ts` before JSON middleware
> - Handles: checkout completion, subscription events, invoice events

---

## ⚙️ Query Parameters

### Products

- `active` - Filter by active status (true/false)
- `limit` - Number of items (max 100)
- `starting_after` - Pagination cursor
- `ending_before` - Pagination cursor

### Prices

- `active` - Filter by active status (true/false)
- `product` - Filter by product ID
- `currency` - Filter by currency (usd, eur, etc.)
- `type` - Filter by type (one_time, recurring)
- `limit` - Number of items (max 100)
- `starting_after` - Pagination cursor
- `ending_before` - Pagination cursor

### Checkout Sessions

- `limit` - Number of items (max 100)
- `starting_after` - Pagination cursor
- `ending_before` - Pagination cursor

### Payment Links

- `active` - Filter by active status (true/false)
- `limit` - Number of items (max 100)
- `starting_after` - Pagination cursor
- `ending_before` - Pagination cursor

### Webhook Endpoints

- `limit` - Number of items (max 100)
- `starting_after` - Pagination cursor
- `ending_before` - Pagination cursor

### Subscriptions

- `customer` - Filter by customer ID
- `price` - Filter by price ID
- `status` - Filter by status (active, past_due, unpaid, canceled, incomplete, incomplete_expired, trialing, paused)
- `limit` - Number of items (max 100)
- `starting_after` - Pagination cursor
- `ending_before` - Pagination cursor

---

## 🗂️ Project Structure

```
stripe/
├── checkout-sessions/
│   ├── config/                  # Configuration files
│   ├── routes.ts                # Checkout session endpoints
│   ├── services.ts              # Checkout session operations
│   └── types.ts                 # Type definitions
├── payment-links/
│   ├── routes.ts                # Payment link endpoints
│   ├── services.ts              # Payment link operations
│   └── types.ts                 # Type definitions
├── prices/
│   ├── routes.ts                # Price endpoints
│   ├── services.ts              # Price CRUD operations
│   └── types.ts                 # Type definitions
├── products/
│   ├── routes.ts                # Product endpoints
│   ├── services.ts              # Product CRUD operations
│   └── types.ts                 # Type definitions
├── subscriptions/
│   ├── routes.ts                # Subscription endpoints
│   ├── services.ts              # Subscription CRUD + Billing Portal
│   └── types.ts                 # Type definitions
├── webhook/
│   ├── routes.ts                # Webhook endpoint management
│   ├── services.ts              # Webhook endpoint CRUD operations
│   └── types.ts                 # Type definitions
├── webhook-events/
│   ├── routes.ts                # Stripe event webhook handler (/webhooks/stripe)
│   ├── services.ts              # Webhook event processing logic
│   └── types.ts                 # Type definitions
├── index.ts                     # Main router with all sub-routers
└── README.md                    # This file
```
