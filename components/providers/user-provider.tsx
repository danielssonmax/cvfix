"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const UserContext = createContext(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
    }

    loadUser()
  }, [])

  const value = {
    user,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
