import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnon)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Property {
  id:         string
  slug:       string
  owner_id:   string | null
  name:       string
  type:       string
  city:       string
  guest_mix:  string
  plan:       string
  trial_ends: string
  created_at: string
}

export interface ContentBlock {
  id:          string
  property_id: string
  type:        string   // 'wifi' | 'rules' | 'parking' | 'breakfast' | 'contact'
  title_de:    string
  title_en:    string
  body_de:     string
  body_en:     string
  position:    number
}

export interface Photo {
  id:           string
  property_id:  string
  storage_path: string
  position:     number
}

export type Lang = 'de' | 'en'
