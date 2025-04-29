import { CourseForm } from "@/components/dashboard/course-form"
import { createCourseAction } from "@/app/actions/course-actions"

export default function NewCoursePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Buat Kursus Baru</h1>
      <CourseForm action={createCourseAction} />
    </div>
  )
}
