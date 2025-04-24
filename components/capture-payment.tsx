"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Mail, CreditCard } from "lucide-react"
import StripeCheckoutDialog from "./stripe-checkout-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CapturePaymentProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess: () => void
}

export default function CapturePayment({ isOpen, onClose, onPaymentSuccess }: CapturePaymentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handlePaymentClick = () => {
    setIsDialogOpen(true)
  }

  const handlePaymentSuccess = () => {
    setIsSubscribed(true)
    onPaymentSuccess()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Slutför din nedladdning</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {/* Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Home className="h-5 w-5 text-[#00bf63]" />
              <span>Skapa professionella CV:n direkt online</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#00bf63]" />
              <span>Få tillgång till alla CV-mallar och funktioner</span>
            </div>
          </div>

          {/* Pricing Option Section */}
          <div className="mt-6">
            <RadioGroup defaultValue="trial" className="space-y-4" value="trial" onValueChange={() => {}}>
              <div className="border-2 border-[#00bf63] rounded-lg p-4 relative">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="trial" id="trial" />
                  <Label htmlFor="trial" className="flex-grow">
                    <div>
                      <div className="font-semibold">Prova 7 dagar gratis</div>
                      <div className="text-sm text-gray-500">därefter 99kr/vecka</div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Section */}
          <div className="mt-6">
            <div className="flex justify-center gap-4 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RaPCIwYXIQatAlX2OK3SaogorDPuXc.png"
                alt="Visa"
                width={40}
                height={25}
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RaPCIwYXIQatAlX2OK3SaogorDPuXc.png"
                alt="Mastercard"
                width={40}
                height={25}
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RaPCIwYXIQatAlX2OK3SaogorDPuXc.png"
                alt="Apple Pay"
                width={40}
                height={25}
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RaPCIwYXIQatAlX2OK3SaogorDPuXc.png"
                alt="Google Pay"
                width={40}
                height={25}
              />
            </div>
            <Button
              className="w-full bg-[#00bf63] hover:bg-[#00a857] text-white"
              size="lg"
              onClick={handlePaymentClick}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {isSubscribed ? "Ladda ner" : "Betala nu"}
            </Button>
            <p className="text-center text-sm text-gray-500 mt-4">Avsluta online när som helst</p>
          </div>
        </div>
      </DialogContent>
      <StripeCheckoutDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Dialog>
  )
}
