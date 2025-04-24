"use client"
import { useState, useEffect, useCallback } from "react"

type ToastProps = {
  title: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

let toastFn: (props: ToastProps) => void

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback((props: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, props])
  }, [])

  const dismiss = useCallback((index: number) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index))
  }, [])

  useEffect(() => {
    toastFn = toast
  }, [toast])

  useEffect(() => {
    const timerIds: NodeJS.Timeout[] = []

    toasts.forEach((toast, index) => {
      const duration = toast.duration || 3000

      const timerId = setTimeout(() => {
        dismiss(index)
      }, duration)

      timerIds.push(timerId)
    })

    return () => {
      timerIds.forEach((timerId) => clearTimeout(timerId))
    }
  }, [toasts, dismiss])

  return { toast, toasts, dismiss }
}

export const toast = (props: ToastProps) => {
  if (toastFn) {
    toastFn(props)
  } else {
    console.warn("Toast function called before it was initialized")
  }
}

export type { ToastProps }
