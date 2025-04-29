"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"

export async function getAnnouncements() {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    // Get latest announcements
    const { data, error } = await supabase
      .from("announcements")
      .select(`
        id,
        title,
        content,
        created_at,
        author_id,
        users (
          id,
          full_name
        )
      `)
      .order("created_at", { ascending: false })
      .limit(5)

    if (error) {
      return { error: error.message }
    }

    return { data }
  } catch (error) {
    console.error("Error in getAnnouncements:", error)
    return { error: "Terjadi kesalahan saat mengambil data pengumuman" }
  }
}
