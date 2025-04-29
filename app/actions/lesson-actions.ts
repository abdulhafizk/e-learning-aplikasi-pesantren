"use server"

import { createLesson, updateLesson } from "@/app/actions/lessons"

export async function createLessonAction(formData: FormData) {
  const courseId = formData.get("courseId") as string
  if (!courseId) {
    return { error: "ID kursus tidak ditemukan" }
  }

  return await createLesson(courseId, formData)
}

export async function updateLessonAction(formData: FormData) {
  const lessonId = formData.get("lessonId") as string
  if (!lessonId) {
    return { error: "ID materi tidak ditemukan" }
  }

  return await updateLesson(lessonId, formData)
}
