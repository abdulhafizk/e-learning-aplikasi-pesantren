"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"

export async function getEnrollments() {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Tidak ada sesi yang aktif" }
    }

    // Get enrollments with course details
    const { data, error } = await supabase
      .from("enrollments")
      .select(`
        id,
        progress,
        last_accessed,
        course_id,
        courses (
          id,
          title,
          description,
          cover_image,
          ustadz_id,
          users (
            id,
            full_name
          )
        )
      `)
      .eq("santri_id", session.user.id)

    if (error) {
      return { error: error.message }
    }

    return { data }
  } catch (error) {
    console.error("Error in getEnrollments:", error)
    return { error: "Terjadi kesalahan saat mengambil data kursus" }
  }
}

export async function enrollInCourse(courseId: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Tidak ada sesi yang aktif" }
    }

    // Check if already enrolled
    const { data: existingEnrollment, error: checkError } = await supabase
      .from("enrollments")
      .select("id")
      .eq("santri_id", session.user.id)
      .eq("course_id", courseId)
      .maybeSingle()

    if (checkError) {
      return { error: checkError.message }
    }

    if (existingEnrollment) {
      return { error: "Anda sudah terdaftar dalam kursus ini" }
    }

    // Create new enrollment
    const { data, error } = await supabase
      .from("enrollments")
      .insert({
        santri_id: session.user.id,
        course_id: courseId,
        progress: 0,
      })
      .select()

    if (error) {
      return { error: error.message }
    }

    return { data: data[0] }
  } catch (error) {
    console.error("Error in enrollInCourse:", error)
    return { error: "Terjadi kesalahan saat mendaftar kursus" }
  }
}

export async function updateEnrollmentProgress(enrollmentId: string, progress: number) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Tidak ada sesi yang aktif" }
    }

    const { data, error } = await supabase
      .from("enrollments")
      .update({
        progress,
        last_accessed: new Date().toISOString(),
      })
      .eq("id", enrollmentId)
      .eq("santri_id", session.user.id)
      .select()

    if (error) {
      return { error: error.message }
    }

    return { data: data[0] }
  } catch (error) {
    console.error("Error in updateEnrollmentProgress:", error)
    return { error: "Terjadi kesalahan saat memperbarui progress" }
  }
}
