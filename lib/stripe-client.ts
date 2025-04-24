import { loadStripe } from "@stripe/stripe-js"

let stripePromise: Promise<any>

const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!publishableKey) {
      console.warn('Stripe publishable key is not set. Please add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment variables.')
      return null
    }
    stripePromise = loadStripe(publishableKey)
  }
  return stripePromise
}

export const createCheckoutSession = async (priceId: string): Promise<string> => {
  try {
    const stripe = await getStripe()
    if (!stripe) {
      throw new Error('Stripe is not properly initialized. Please check your environment variables.')
    }

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response from server:", errorText)
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }

    const data = await response.json()
    if (!data.clientSecret) {
      console.error("Response data:", data)
      throw new Error("No client secret received from the server")
    }
    return data.clientSecret
  } catch (error) {
    console.error("Error in createCheckoutSession:", error)
    if (error instanceof Error) {
      throw new Error(`Checkout session creation failed: ${error.message}`)
    } else {
      throw new Error("Checkout session creation failed with an unknown error")
    }
  }
}
