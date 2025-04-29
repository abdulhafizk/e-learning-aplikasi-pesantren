"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { CourseForm } from "@/components/dashboard/course-form"
import { getCourseById } from "@/app/actions/courses"
import { Skeleton } from "@/components/ui/skeleton"
import { notFound } from "next/navigation"
import { updateCourseAction } from "@/app/actions/course-actions"

interface EditCoursePageProps {
  params: {
    id: string
  }
}

export default function EditCoursePage({ params }: EditCoursePageProps) {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Link href={`/dashboard/ustadz/courses/${params.id}`}>
          <Button variant="ghost" size="sm" className="mr-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit Kursus</h1>
      </div>

      <Suspense fallback={<CourseFormSkeleton />}>
        <EditCourseForm id={params.id} />
      </Suspense>
    </div>
  )
}

async function EditCourseForm({ id }: { id: string }) {
  const { data: course, error } = await getCourseById(id)

  if (error) {
    return <p className="text-red-500">Gagal memuat kursus: {error}</p>
  }

  if (!course) {
    notFound()
  }

  return (
    <CourseForm
      id={id}
      defaultValues={{
        title: course.title,
        description: course.description || "",
        isPublished: course.is_published,
      }}
      onSubmit={updateCourseAction}
      submitLabel="Perbarui Kursus"
      cancelHref={`/dashboard/ustadz/courses/${id}`}
    />
  )
}

function CourseFormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40 mb-4" />
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-32 w-full mb-4" />
      <Skeleton className="h-6 w-40 mb-8" />
      <div className="flex justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}
