import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get("session_id")

  try {
    if (sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      return NextResponse.json({ status: session.status })
    } else {
      return NextResponse.json({ error: "No session ID provided" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Error retrieving session" }, { status: 500 })
  }
}
