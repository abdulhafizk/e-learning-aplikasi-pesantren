"use server"

import { updateCourse, createCourse, deleteCourse } from "@/app/actions/courses"

export async function updateCourseAction(formData: FormData) {
  const id = formData.get("id") as string
  if (!id) {
    return { error: "ID kursus tidak ditemukan" }
  }

  return await updateCourse(id, formData)
}

export async function createCourseAction(formData: FormData) {
  return await createCourse(formData)
}

export async function deleteCourseAction(id: string) {
  return await deleteCourse(id)
}
