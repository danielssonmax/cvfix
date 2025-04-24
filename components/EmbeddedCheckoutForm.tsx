"use client"

import { useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import type { StripeError } from "@stripe/stripe-js"

interface EmbeddedCheckoutFormProps {
  onPaymentSuccess: () => void
}

export function EmbeddedCheckoutForm({ onPaymentSuccess }: EmbeddedCheckoutFormProps) {
  const [error, setError] = useState<StripeError | null>(null)

  return (
    <div className="w-full">
      <EmbeddedCheckoutProvider
        onComplete={onPaymentSuccess}
        onError={(error) => {
          console.error("Stripe error:", error)
          setError(error)
        }}
      >
        <div className="min-h-[400px] w-full">
          <EmbeddedCheckout className="w-full" />
        </div>
      </EmbeddedCheckoutProvider>
      {error && <div className="text-red-500 mt-4 text-sm">Ett fel uppstod: {error.message}</div>}
    </div>
  )
}
