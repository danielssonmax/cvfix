"use server"

import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profil/skapa-cv?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profil/skapa-cv`,
    })

    return { clientSecret: session.client_secret }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw new Error("Failed to create checkout session. Please try again later.")
  }
}

export async function checkSubscriptionStatus(userId: string) {
  try {
    const { data, error } = await supabase
      .from("premium")
      .select("paid")
      .eq("user_id", userId)
      .single()

    if (error) {
      console.error("Error checking premium status:", error)
      return { isSubscribed: false }
    }

    return { isSubscribed: data?.paid || false }
  } catch (error) {
    console.error("Error checking premium status:", error)
    return { isSubscribed: false }
  }
}
