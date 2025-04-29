import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface StudentsPageProps {
  params: {
    id: string
  }
}

export default function StudentsPage({ params }: StudentsPageProps) {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Link href={`/dashboard/ustadz/courses/${params.id}`}>
          <Button variant="ghost" size="sm" className="mr-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali ke Kursus
          </Button>
        </Link>
        <Suspense fallback={<Skeleton className="h-8 w-40" />}>
          <CourseTitle id={params.id} />
        </Suspense>
      </div>

      <div className="grid gap-6">
        <Suspense fallback={<StudentsListSkeleton />}>
          <StudentsList courseId={params.id} />
        </Suspense>
      </div>
    </div>
  )
}

async function CourseTitle({ id }: { id: string }) {
  const supabase = createServerActionClient<Database>({ cookies })

  const { data: course, error } = await supabase.from("courses").select("title").eq("id", id).single()

  if (error || !course) {
    return <h1 className="text-2xl font-bold">Santri Terdaftar</h1>
  }

  return <h1 className="text-2xl font-bold">Santri Terdaftar - {course.title}</h1>
}

async function StudentsList({ courseId }: { courseId: string }) {
  const supabase = createServerActionClient<Database>({ cookies })

  const { data: enrollments, error } = await supabase
    .from("enrollments")
    .select(
      `
      id,
      progress,
      last_accessed,
      santri_id,
      users (
        id,
        full_name,
        username,
        class,
        avatar_url
      )
    `,
    )
    .eq("course_id", courseId)

  if (error) {
    return <p className="text-red-500">Gagal memuat data santri: {error.message}</p>
  }

  if (!enrollments || enrollments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Santri Terdaftar</CardTitle>
          <CardDescription>Daftar santri yang terdaftar dalam kursus ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Belum ada santri yang terdaftar</h3>
            <p className="text-gray-500">Santri yang mendaftar dalam kursus ini akan muncul di sini.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Santri Terdaftar</CardTitle>
        <CardDescription>Daftar santri yang terdaftar dalam kursus ini</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="flex items-center justify-between p-3 bg-white border rounded-md">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={enrollment.users?.avatar_url || "/placeholder.svg"}
                    alt={enrollment.users?.full_name || ""}
                  />
                  <AvatarFallback>{(enrollment.users?.full_name || "S").charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{enrollment.users?.full_name || "Santri"}</p>
                  <p className="text-sm text-gray-500">{enrollment.users?.class || "Santri"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm">Progress: {enrollment.progress}%</p>
                  <p className="text-xs text-gray-500">
                    Terakhir akses:{" "}
                    {enrollment.last_accessed
                      ? new Date(enrollment.last_accessed).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Belum pernah diakses"}
                  </p>
                </div>
                <div className="w-32">
                  <Progress value={enrollment.progress} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function StudentsListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-60" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white border rounded-md">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-2 w-32" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
