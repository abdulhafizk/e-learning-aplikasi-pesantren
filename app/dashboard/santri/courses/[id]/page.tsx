import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, FileText } from "lucide-react"
import { getCourseById } from "@/app/actions/courses"
import { Skeleton } from "@/components/ui/skeleton"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

interface CoursePageProps {
  params: {
    id: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/santri">
          <Button variant="ghost" size="sm" className="mr-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
        <Suspense fallback={<Skeleton className="h-8 w-40" />}>
          <CourseTitle id={params.id} />
        </Suspense>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Suspense fallback={<CourseLessonsSkeleton />}>
            <CourseLessons id={params.id} />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<CourseInfoSkeleton />}>
            <CourseInfo id={params.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

async function CourseTitle({ id }: { id: string }) {
  const { data: course, error } = await getCourseById(id)

  if (error || !course) {
    return <h1 className="text-2xl font-bold">Kursus</h1>
  }

  return <h1 className="text-2xl font-bold">{course.title}</h1>
}

async function CourseLessons({ id }: { id: string }) {
  const { data: course, error } = await getCourseById(id)

  if (error) {
    return <p className="text-red-500">Gagal memuat kursus: {error}</p>
  }

  if (!course) {
    notFound()
  }

  const lessons = course.lessons || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Materi Pembelajaran</CardTitle>
        <CardDescription>Daftar materi dalam kursus ini</CardDescription>
      </CardHeader>
      <CardContent>
        {lessons.length > 0 ? (
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="border rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {index + 1}. {lesson.title}
                      </h3>
                    </div>
                  </div>
                  <Link href={`/dashboard/santri/courses/${id}/lessons/${lesson.id}`}>
                    <Button size="sm" className="bg-green-700 hover:bg-green-800">
                      Pelajari
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Belum ada materi dalam kursus ini.</p>
        )}
      </CardContent>
    </Card>
  )
}

function CourseLessonsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-60" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-md p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

async function CourseInfo({ id }: { id: string }) {
  const { data: course, error } = await getCourseById(id)

  if (error) {
    return <p className="text-red-500">Gagal memuat informasi kursus: {error}</p>
  }

  if (!course) {
    notFound()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Kursus</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-sm text-gray-500">Pengajar</h3>
          <p>{course.users?.full_name || "Tidak ada pengajar"}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-gray-500">Deskripsi</h3>
          <p>{course.description || "Tidak ada deskripsi"}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-gray-500">Jumlah Materi</h3>
          <p>{course.lessons?.length || 0} materi</p>
        </div>
      </CardContent>
    </Card>
  )
}

function CourseInfoSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
