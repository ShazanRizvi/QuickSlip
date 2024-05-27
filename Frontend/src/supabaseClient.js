import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseAnonKey } from './utils/constants'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)