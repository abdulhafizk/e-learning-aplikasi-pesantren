"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { CourseForm } from "@/components/dashboard/course-form"
import { createCourseAction } from "@/app/actions/course-actions"

export default function NewCoursePage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/ustadz/courses">
          <Button variant="ghost" size="sm" className="mr-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Buat Kursus Baru</h1>
      </div>

      <CourseForm onSubmit={createCourseAction} submitLabel="Buat Kursus" />
    </div>
  )
}
