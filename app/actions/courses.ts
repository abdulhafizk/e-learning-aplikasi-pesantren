"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"

export async function getCourses() {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Tidak ada sesi yang aktif" }
    }

    // Get user role
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", session.user.id)
      .single()

    if (userError) {
      return { error: userError.message }
    }

    let query = supabase.from("courses").select(`
      id, 
      title, 
      description, 
      cover_image, 
      is_published, 
      created_at,
      ustadz_id,
      users (full_name)
    `)

    // If user is ustadz, only show their courses
    if (userData.role === "ustadz") {
      query = query.eq("ustadz_id", session.user.id)
    } else {
      // If user is santri, only show published courses
      query = query.eq("is_published", true)
    }

    const { data, error } = await query

    if (error) {
      return { error: error.message }
    }

    return { data }
  } catch (error) {
    console.error("Error in getCourses:", error)
    return { error: "Terjadi kesalahan saat mengambil data pelajaran" }
  }
}

export async function getCourseById(courseId: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const { data, error } = await supabase
      .from("courses")
      .select(`
        id, 
        title, 
        description, 
        cover_image, 
        is_published, 
        created_at,
        ustadz_id,
        users (id, full_name)
      `)
      .eq("id", courseId)
      .single()

    if (error) {
      return { error: error.message }
    }

    // Get lessons for this course
    const { data: lessons, error: lessonsError } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", courseId)
      .order("order_index", { ascending: true })

    if (lessonsError) {
      return { error: lessonsError.message }
    }

    return { data: { ...data, lessons } }
  } catch (error) {
    console.error("Error in getCourseById:", error)
    return { error: "Terjadi kesalahan saat mengambil data pelajaran" }
  }
}

export async function createCourse(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Tidak ada sesi yang aktif" }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const isPublished = formData.get("isPublished") === "true"

    const { data, error } = await supabase
      .from("courses")
      .insert({
        title,
        description,
        ustadz_id: session.user.id,
        is_published: isPublished,
      })
      .select()

    if (error) {
      return { error: error.message }
    }

    return { data: data[0] }
  } catch (error) {
    console.error("Error in createCourse:", error)
    return { error: "Terjadi kesalahan saat membuat pelajaran baru" }
  }
}

export async function updateCourse(courseId: string, formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Tidak ada sesi yang aktif" }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const isPublished = formData.get("isPublished") === "true"

    const { data, error } = await supabase
      .from("courses")
      .update({
        title,
        description,
        is_published: isPublished,
      })
      .eq("id", courseId)
      .eq("ustadz_id", session.user.id)
      .select()

    if (error) {
      return { error: error.message }
    }

    return { data: data[0] }
  } catch (error) {
    console.error("Error in updateCourse:", error)
    return { error: "Terjadi kesalahan saat memperbarui pelajaran" }
  }
}

export async function deleteCourse(courseId: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Tidak ada sesi yang aktif" }
    }

    const { error } = await supabase.from("courses").delete().eq("id", courseId).eq("ustadz_id", session.user.id)

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in deleteCourse:", error)
    return { error: "Terjadi kesalahan saat menghapus pelajaran" }
  }
}
