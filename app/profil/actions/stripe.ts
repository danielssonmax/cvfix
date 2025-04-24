"use server"

import Stripe from "stripe"

let stripe: Stripe | null = null

try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    })
  } else {
    console.error("STRIPE_SECRET_KEY is not set in the environment variables")
  }
} catch (error) {
  console.error("Error initializing Stripe:", error)
}

export async function createCheckoutSession(priceId: string) {
  if (!stripe) {
    throw new Error("Stripe is not initialized. Please check your environment variables.")
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    })

    return { clientSecret: session.client_secret }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw new Error("Failed to create checkout session. Please try again later.")
  }
}

export async function checkSubscriptionStatus() {
  if (!stripe) {
    throw new Error("Stripe is not initialized. Please check your environment variables.")
  }

  // Implement the logic to check subscription status
  // This is a placeholder and should be replaced with actual logic
  return { isSubscribed: false }
}
