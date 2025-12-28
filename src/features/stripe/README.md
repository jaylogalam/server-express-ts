# Stripe Feature - Quick Reference

Complete Stripe integration with services and routers for Products, Prices, Checkout Sessions, and Payment Links.

---

## ⚠️ Important Notes

> **Environment Variable**: Requires `STRIPE_SECRET_KEY` in your `.env` file

> **Price Immutability**: Cannot change `unit_amount` or `currency` after creation

> **Product Deletion**: Products are archived, not permanently deleted

> **Session Expiration**: Checkout sessions auto-expire after 24 hours unless completed

> **Payment Links**: Shareable URLs for accepting payments without building custom checkout

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

### Checkout Sessions: `/stripe/sessions`

```bash
POST   /stripe/sessions/create          # Create checkout session
GET    /stripe/sessions/retrieve/:id    # Retrieve session
PATCH  /stripe/sessions/update/:id      # Update session
GET    /stripe/sessions/list            # List sessions
POST   /stripe/sessions/expire/:id      # Expire session
```

### Payment Links: `/stripe/payment-links`

```bash
POST   /stripe/payment-links/create         # Create payment link
GET    /stripe/payment-links/retrieve/:id   # Retrieve payment link
PATCH  /stripe/payment-links/update/:id     # Update payment link
GET    /stripe/payment-links/list           # List payment links
GET    /stripe/payment-links/line-items/:id # Get line items
```

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

---

## 🗂️ Project Structure

```
stripe/
├── services/
│   ├── product.services.ts      # Product CRUD operations
│   ├── price.services.ts        # Price CRUD operations
│   ├── session.services.ts      # Checkout session operations
│   ├── payment-link.services.ts # Payment link operations
│   └── index.ts                 # Service exports
├── routes/
│   ├── product.routers.ts       # Product endpoints
│   ├── price.routers.ts         # Price endpoints
│   ├── session.routers.ts       # Session endpoints
│   ├── payment-link.routers.ts  # Payment link endpoints
│   └── index.ts                 # Router exports
├── types/
│   └── index.ts                 # TypeScript type definitions
└── README.md                    # This file
```
