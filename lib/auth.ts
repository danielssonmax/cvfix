import { supabase } from "./supabase-client"

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Error logging out:", error)
    throw error
  }
}
/**asdas */
