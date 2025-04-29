"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { LessonForm } from "@/components/dashboard/lesson-form"
import { updateLessonAction } from "@/app/actions/lesson-actions"
import { Skeleton } from "@/components/ui/skeleton"
import { notFound } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"

interface EditLessonPageProps {
  params: {
    id: string
    lessonId: string
  }
}

export default function EditLessonPage({ params }: EditLessonPageProps) {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Link href={`/dashboard/ustadz/courses/${params.id}`}>
          <Button variant="ghost" size="sm" className="mr-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit Materi</h1>
      </div>

      <Suspense fallback={<LessonFormSkeleton />}>
        <EditLessonForm
          courseId={params.id}
          lessonId={params.lessonId}
          cancelHref={`/dashboard/ustadz/courses/${params.id}`}
        />
      </Suspense>
    </div>
  )
}

async function EditLessonForm({
  courseId,
  lessonId,
  cancelHref,
}: {
  courseId: string
  lessonId: string
  cancelHref: string
}) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: lesson, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .eq("course_id", courseId)
    .single()

  if (error) {
    return <p className="text-red-500">Gagal memuat materi: {error.message}</p>
  }

  if (!lesson) {
    notFound()
  }

  return (
    <LessonForm
      id={lessonId}
      courseId={courseId}
      defaultValues={{
        title: lesson.title,
        content: lesson.content || "",
        orderIndex: lesson.order_index,
      }}
      onSubmit={updateLessonAction}
      submitLabel="Perbarui Materi"
      cancelHref={cancelHref}
    />
  )
}

function LessonFormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40 mb-4" />
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-32 w-full mb-4" />
      <Skeleton className="h-10 w-full mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}
