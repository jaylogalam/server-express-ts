# Stripe CRUD Quick Reference

## 🚀 Endpoints Overview

### Products: `/stripe/products`

```bash
POST   /stripe/products           # Create product
GET    /stripe/products/:id       # Get product
PATCH  /stripe/products/:id       # Update product
DELETE /stripe/products/:id       # Delete product
GET    /stripe/products           # List products
GET    /stripe/products/search    # Search products
```

### Prices: `/stripe/prices`

```bash
POST   /stripe/prices             # Create price
GET    /stripe/prices/:id         # Get price
PATCH  /stripe/prices/:id         # Update price (metadata only)
GET    /stripe/prices             # List prices
GET    /stripe/prices/search      # Search prices
```

---

## 📦 Quick Start Examples

### Create Product + Price

```bash
# 1. Create product
curl -X POST http://localhost:3000/stripe/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pro Plan",
    "description": "Professional tier"
  }'

# Response: {"id": "prod_xxx", ...}

# 2. Create monthly price
curl -X POST http://localhost:3000/stripe/prices \
  -H "Content-Type: application/json" \
  -d '{
    "product": "prod_xxx",
    "currency": "usd",
    "unit_amount": 2999,
    "recurring": {"interval": "month"}
  }'
```

### List with Filters

```bash
# Active products only
GET /stripe/products?active=true&limit=10

# Prices for specific product
GET /stripe/prices?product=prod_xxx

# Recurring USD prices
GET /stripe/prices?type=recurring&currency=usd
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

---

## ⚠️ Important Notes

> **Price Immutability**: Cannot change `unit_amount` or `currency` after creation

> **Route Change**: `/stripe/product/*` → `/stripe/products/*`

> **Deletion**: Products are archived, not permanently deleted
