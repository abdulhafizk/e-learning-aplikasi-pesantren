import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, FileText, Plus, Pencil } from "lucide-react"
import { getCourseById } from "@/app/actions/courses"
import { Skeleton } from "@/components/ui/skeleton"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"

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
        <Link href="/dashboard/ustadz/courses">
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

  return (
    <div className="flex items-center gap-3">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <Badge
        variant={course.is_published ? "default" : "outline"}
        className={course.is_published ? "bg-green-700" : ""}
      >
        {course.is_published ? "Dipublikasikan" : "Draft"}
      </Badge>
    </div>
  )
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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Materi Pembelajaran</CardTitle>
          <CardDescription>Kelola materi dalam kursus ini</CardDescription>
        </div>
        <Link href={`/dashboard/ustadz/courses/${id}/lessons/new`}>
          <Button className="bg-green-700 hover:bg-green-800">
            <Plus className="h-4 w-4 mr-2" /> Tambah Materi
          </Button>
        </Link>
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
                  <div className="flex gap-2">
                    <Link href={`/dashboard/ustadz/courses/${id}/lessons/${lesson.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Pencil className="h-4 w-4 mr-2" /> Edit
                      </Button>
                    </Link>
                    <Link href={`/dashboard/ustadz/courses/${id}/lessons/${lesson.id}`}>
                      <Button size="sm" className="bg-green-700 hover:bg-green-800">
                        Lihat
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Belum ada materi</h3>
            <p className="text-gray-500 mb-4">Tambahkan materi pembelajaran untuk kursus ini</p>
            <Link href={`/dashboard/ustadz/courses/${id}/lessons/new`}>
              <Button className="bg-green-700 hover:bg-green-800">
                <Plus className="h-4 w-4 mr-2" /> Tambah Materi
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CourseLessonsSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-60" />
        </div>
        <Skeleton className="h-10 w-32" />
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
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </div>
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
        <div>
          <h3 className="font-medium text-sm text-gray-500">Status</h3>
          <p>{course.is_published ? "Dipublikasikan" : "Draft"}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-gray-500">Dibuat pada</h3>
          <p>
            {new Date(course.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="pt-4">
          <Link href={`/dashboard/ustadz/courses/${id}/edit`}>
            <Button className="w-full bg-green-700 hover:bg-green-800">
              <Pencil className="h-4 w-4 mr-2" /> Edit Kursus
            </Button>
          </Link>
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
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i}>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
        <Skeleton className="h-10 w-full mt-4" />
      </CardContent>
    </Card>
  )
}
