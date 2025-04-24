"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface DownloadPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function DownloadPopup({ isOpen, onClose }: DownloadPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>CV Klart för Nedladdning</DialogTitle>
          <DialogDescription>Ditt CV är nu redo att laddas ner i PDF-format.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center my-4">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        <div className="mt-4 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Genom att ladda ner detta CV bekräftar du att du har läst och godkänt våra användarvillkor och
            sekretesspolicy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <Button 
              onClick={onClose} 
              variant="outline"
              className="w-full sm:w-auto"
            >
              Avbryt
            </Button>
            <Button
              onClick={() => {
                // Implement download logic here
                console.log("Downloading CV...")
                onClose()
              }}
              className="w-full sm:w-auto"
            >
              Ladda ner CV
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
