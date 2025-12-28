# Frontend Checkout Integration Guide

How to integrate Stripe checkout with your frontend application.

---

## 🎯 Option 1: Checkout Sessions (Recommended)

This creates a hosted Stripe checkout page and redirects the user to it.

### Frontend Implementation

```typescript
// Example: React/TypeScript
const handleCheckout = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/stripe/sessions/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          line_items: [
            {
              price: "price_xxxxxxxxxxxxx", // Your Stripe price ID
              quantity: 1,
            },
          ],
          mode: "payment", // or 'subscription'
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/cancel`,
        }),
      }
    );

    const session = await response.json();

    // Redirect to Stripe's hosted checkout page
    window.location.href = session.url;
  } catch (error) {
    console.error("Checkout error:", error);
  }
};
```

### Key Points

- ✅ **No frontend Stripe library needed** - just redirect to `session.url`
- ✅ **PCI compliant** - Stripe handles all payment details
- ✅ **Mobile optimized** - Works on all devices
- ✅ **Secure** - Payment data never touches your server

---

## 🔗 Option 2: Payment Links (Even Simpler)

Create a payment link once, then reuse the URL anywhere.

### Backend: Create Payment Link (One Time)

```bash
curl -X POST http://localhost:3000/stripe/payment-links/create \
  -H "Content-Type: application/json" \
  -d '{
    "line_items": [{
      "price": "price_xxxxxxxxxxxxx",
      "quantity": 1
    }]
  }'

# Response: { "url": "https://buy.stripe.com/test_xxxxxxxxxxxxx", ... }
```

### Frontend: Just Link to It

```tsx
// React example
<a href="https://buy.stripe.com/test_xxxxxxxxxxxxx" target="_blank">
  Buy Now
</a>;

// Or redirect programmatically
window.location.href = "https://buy.stripe.com/test_xxxxxxxxxxxxx";
```

### Key Points

- ✅ **Static URL** - Create once, reuse everywhere
- ✅ **No backend call needed** from frontend
- ✅ **Perfect for** - Email campaigns, social media, simple "Buy Now" buttons
- ❌ **Limited customization** - Can't customize per-user

---

## 📊 Comparison

| Feature              | Checkout Sessions          | Payment Links              |
| -------------------- | -------------------------- | -------------------------- |
| **Dynamic data**     | ✅ Create per-user         | ❌ Static                  |
| **User metadata**    | ✅ Can attach user info    | ❌ Limited                 |
| **Setup complexity** | Medium (frontend API call) | Low (just a link)          |
| **Best for**         | SaaS, custom flows         | Simple products, marketing |

---

## 🎬 Complete Example: React Component

```typescript
import { useState } from "react";

export function CheckoutButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/stripe/sessions/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            line_items: [{ price: priceId, quantity: 1 }],
            mode: "payment",
            success_url: `${window.location.origin}/success`,
            cancel_url: `${window.location.origin}/cancel`,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create checkout session");

      const session = await response.json();
      window.location.href = session.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout");
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Loading..." : "Checkout"}
    </button>
  );
}
```

---

## 💡 Recommendations

### Use Checkout Sessions when:

- You need to attach user information (email, metadata)
- You want dynamic pricing or quantity
- You need subscription management

### Use Payment Links when:

- You have a simple product with fixed pricing
- You want to share links via email/social media
- You don't need per-user customization

---

## 🔄 Handling Success/Cancel Pages

### Success Page

After successful payment, user is redirected to your `success_url` with the session ID:

```typescript
// pages/success.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (sessionId) {
      // Optionally retrieve session details
      fetch(`http://localhost:3000/stripe/sessions/retrieve/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setSession(data));
    }
  }, [sessionId]);

  return (
    <div>
      <h1>Payment Successful! 🎉</h1>
      <p>Thank you for your purchase.</p>
      {session && <p>Order ID: {session.id}</p>}
    </div>
  );
}
```

### Cancel Page

```typescript
// pages/cancel.tsx
export function CancelPage() {
  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. No charges were made.</p>
      <a href="/">Return to home</a>
    </div>
  );
}
```

---

## 🚀 For Most SaaS Applications

**Checkout Sessions** is the better choice since you can:

- Customize each session with user-specific data
- Have more control over the checkout flow
- Attach metadata for your backend to process
- Support both one-time payments and subscriptions
