import { notFound } from "next/navigation"
import { CourseForm } from "@/components/dashboard/course-form"
import { getCourseById } from "@/app/actions/courses"
import { updateCourseAction } from "@/app/actions/course-actions"

interface EditCoursePageProps {
  params: {
    id: string
  }
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { data: course, error } = await getCourseById(params.id)

  if (error || !course) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Kursus</h1>
      <CourseForm
        action={updateCourseAction}
        initialData={{
          id: course.id,
          title: course.title,
          description: course.description || "",
          isPublished: course.is_published || false,
        }}
      />
    </div>
  )
}
