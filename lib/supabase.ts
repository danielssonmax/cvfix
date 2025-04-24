import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ivocubrsbufrvswnwkyp.supabase.co/'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2b2N1YnJzYnVmcnZzd253a3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NDg0MzEsImV4cCI6MjA1NTIyNDQzMX0.WGNtyjx1VIL0pAE5cPtdLQZgFsbgmEgRQUa-wVPHhR0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
