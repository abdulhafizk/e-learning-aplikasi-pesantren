"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import type { Database } from "@/lib/supabase/database.types"

export async function signUp(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string
  const username = formData.get("username") as string
  const role = formData.get("userType") as "santri" | "ustadz"

  try {
    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username,
          role,
        },
      },
    })

    if (authError) {
      return { error: authError.message }
    }

    // If sign up successful, insert user data into users table
    if (authData.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: authData.user.id,
        username,
        full_name: fullName,
        role,
      })

      if (profileError) {
        return { error: profileError.message }
      }
    }

    return { success: true, message: "Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi." }
  } catch (error) {
    return { error: "Terjadi kesalahan saat mendaftar. Silakan coba lagi." }
  }
}

export async function signIn(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    // Get user role to redirect to the appropriate dashboard
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", data.user.id)
      .single()

    if (userError) {
      return { error: userError.message }
    }

    return {
      success: true,
      role: userData.role,
      message: "Login berhasil!",
    }
  } catch (error) {
    return { error: "Terjadi kesalahan saat login. Silakan coba lagi." }
  }
}

export async function signOut() {
  const supabase = createServerActionClient<Database>({ cookies })

  await supabase.auth.signOut()
  redirect("/login")
}

export async function getSession() {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    return null
  }
}

export async function getUserProfile() {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return null
    }

    const { data, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

    if (error) {
      console.error("Error fetching user profile:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getUserProfile:", error)
    return null
  }
}
