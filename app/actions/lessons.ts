"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"

export async function createLesson(courseId: string, formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Tidak ada sesi yang aktif" }
    }

    // Check if the user is the owner of the course
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("ustadz_id")
      .eq("id", courseId)
      .single()

    if (courseError) {
      return { error: courseError.message }
    }

    if (courseData.ustadz_id !== session.user.id) {
      return { error: "Anda tidak memiliki izin untuk menambahkan materi ke pelajaran ini" }
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const orderIndex = Number.parseInt(formData.get("orderIndex") as string) || 0

    const { data, error } = await supabase
      .from("lessons")
      .insert({
        course_id: courseId,
        title,
        content,
        order_index: orderIndex,
      })
      .select()

    if (error) {
      return { error: error.message }
    }

    return { data: data[0] }
  } catch (error) {
    console.error("Error in createLesson:", error)
    return { error: "Terjadi kesalahan saat membuat materi baru" }
  }
}

export async function updateLesson(lessonId: string, formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Tidak ada sesi yang aktif" }
    }

    // Get the lesson to check course ownership
    const { data: lessonData, error: lessonError } = await supabase
      .from("lessons")
      .select("course_id")
      .eq("id", lessonId)
      .single()

    if (lessonError) {
      return { error: lessonError.message }
    }

    // Check if the user is the owner of the course
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("ustadz_id")
      .eq("id", lessonData.course_id)
      .single()

    if (courseError) {
      return { error: courseError.message }
    }

    if (courseData.ustadz_id !== session.user.id) {
      return { error: "Anda tidak memiliki izin untuk memperbarui materi ini" }
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const orderIndex = Number.parseInt(formData.get("orderIndex") as string) || 0

    const { data, error } = await supabase
      .from("lessons")
      .update({
        title,
        content,
        order_index: orderIndex,
      })
      .eq("id", lessonId)
      .select()

    if (error) {
      return { error: error.message }
    }

    return { data: data[0] }
  } catch (error) {
    console.error("Error in updateLesson:", error)
    return { error: "Terjadi kesalahan saat memperbarui materi" }
  }
}

export async function deleteLesson(lessonId: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Tidak ada sesi yang aktif" }
    }

    // Get the lesson to check course ownership
    const { data: lessonData, error: lessonError } = await supabase
      .from("lessons")
      .select("course_id")
      .eq("id", lessonId)
      .single()

    if (lessonError) {
      return { error: lessonError.message }
    }

    // Check if the user is the owner of the course
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("ustadz_id")
      .eq("id", lessonData.course_id)
      .single()

    if (courseError) {
      return { error: courseError.message }
    }

    if (courseData.ustadz_id !== session.user.id) {
      return { error: "Anda tidak memiliki izin untuk menghapus materi ini" }
    }

    const { error } = await supabase.from("lessons").delete().eq("id", lessonId)

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in deleteLesson:", error)
    return { error: "Terjadi kesalahan saat menghapus materi" }
  }
}
