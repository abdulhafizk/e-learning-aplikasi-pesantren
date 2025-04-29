"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import type { Database } from "@/lib/supabase/database.types"

// Fungsi untuk membuat materi baru
export async function createLessonAction(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  const courseId = formData.get("courseId") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const order = Number.parseInt(formData.get("order") as string) || 0

  try {
    const { data, error } = await supabase
      .from("lessons")
      .insert({
        course_id: courseId,
        title,
        content,
        order,
      })
      .select()

    if (error) {
      return { error: error.message }
    }

    revalidatePath(`/dashboard/ustadz/courses/${courseId}`)
    return { success: true, data: data[0] }
  } catch (error) {
    return { error: "Terjadi kesalahan saat membuat materi" }
  }
}

// Fungsi untuk memperbarui materi
export async function updateLessonAction(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  const id = formData.get("id") as string
  const courseId = formData.get("courseId") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const order = Number.parseInt(formData.get("order") as string) || 0

  try {
    const { error } = await supabase
      .from("lessons")
      .update({
        title,
        content,
        order,
      })
      .eq("id", id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath(`/dashboard/ustadz/courses/${courseId}/lessons/${id}`)
    revalidatePath(`/dashboard/ustadz/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    return { error: "Terjadi kesalahan saat memperbarui materi" }
  }
}

// Fungsi untuk menghapus materi
export async function deleteLessonAction(id: string, courseId: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const { error } = await supabase.from("lessons").delete().eq("id", id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath(`/dashboard/ustadz/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    return { error: "Terjadi kesalahan saat menghapus materi" }
  }
}
