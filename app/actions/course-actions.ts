"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import type { Database } from "@/lib/supabase/database.types"

// Fungsi untuk membuat kursus baru
export async function createCourseAction(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const isPublished = formData.get("isPublished") === "true"

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Tidak ada sesi yang aktif" }
    }

    const { data, error } = await supabase
      .from("courses")
      .insert({
        title,
        description,
        is_published: isPublished,
        user_id: session.user.id,
      })
      .select()

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/dashboard/ustadz")
    return { success: true, data: data[0] }
  } catch (error) {
    return { error: "Terjadi kesalahan saat membuat kursus" }
  }
}

// Fungsi untuk memperbarui kursus
export async function updateCourseAction(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const isPublished = formData.get("isPublished") === "true"

  try {
    const { error } = await supabase
      .from("courses")
      .update({
        title,
        description,
        is_published: isPublished,
      })
      .eq("id", id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath(`/dashboard/ustadz/courses/${id}`)
    revalidatePath("/dashboard/ustadz")
    return { success: true }
  } catch (error) {
    return { error: "Terjadi kesalahan saat memperbarui kursus" }
  }
}

// Fungsi untuk menghapus kursus
export async function deleteCourseAction(id: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    // Hapus semua materi terkait terlebih dahulu
    const { error: lessonsError } = await supabase.from("lessons").delete().eq("course_id", id)

    if (lessonsError) {
      return { error: lessonsError.message }
    }

    // Kemudian hapus kursus
    const { error } = await supabase.from("courses").delete().eq("id", id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/dashboard/ustadz")
    return { success: true }
  } catch (error) {
    return { error: "Terjadi kesalahan saat menghapus kursus" }
  }
}
