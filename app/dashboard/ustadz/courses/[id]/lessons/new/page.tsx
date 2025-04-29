"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { LessonForm } from "@/components/dashboard/lesson-form"
import { createLessonAction } from "@/app/actions/lesson-actions"

interface NewLessonPageProps {
  params: {
    id: string
  }
}

export default function NewLessonPage({ params }: NewLessonPageProps) {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Link href={`/dashboard/ustadz/courses/${params.id}`}>
          <Button variant="ghost" size="sm" className="mr-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Tambah Materi Baru</h1>
      </div>

      <LessonForm
        courseId={params.id}
        onSubmit={createLessonAction}
        submitLabel="Tambah Materi"
        cancelHref={`/dashboard/ustadz/courses/${params.id}`}
      />
    </div>
  )
}
