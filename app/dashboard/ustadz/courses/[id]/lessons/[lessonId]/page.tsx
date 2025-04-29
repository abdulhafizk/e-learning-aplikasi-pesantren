import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Pencil } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { notFound } from "next/navigation"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"

interface LessonPageProps {
  params: {
    id: string
    lessonId: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
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
          <LessonTitle id={params.lessonId} />
        </Suspense>
      </div>

      <div className="grid gap-6">
        <Suspense fallback={<LessonContentSkeleton />}>
          <LessonContent id={params.id} lessonId={params.lessonId} />
        </Suspense>
      </div>
    </div>
  )
}

async function LessonTitle({ id }: { id: string }) {
  const supabase = createServerActionClient<Database>({ cookies })

  const { data: lesson, error } = await supabase.from("lessons").select("title").eq("id", id).single()

  if (error || !lesson) {
    return <h1 className="text-2xl font-bold">Materi</h1>
  }

  return <h1 className="text-2xl font-bold">{lesson.title}</h1>
}

async function LessonContent({ id, lessonId }: { id: string; lessonId: string }) {
  const supabase = createServerActionClient<Database>({ cookies })

  const { data: lesson, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .eq("course_id", id)
    .single()

  if (error) {
    return <p className="text-red-500">Gagal memuat materi: {error.message}</p>
  }

  if (!lesson) {
    notFound()
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Konten Materi</CardTitle>
        <Link href={`/dashboard/ustadz/courses/${id}/lessons/${lessonId}/edit`}>
          <Button className="bg-green-700 hover:bg-green-800">
            <Pencil className="h-4 w-4 mr-2" /> Edit Materi
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          {lesson.content ? (
            <div className="whitespace-pre-wrap">{lesson.content}</div>
          ) : (
            <p className="text-gray-500">Tidak ada konten untuk materi ini.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function LessonContentSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardContent>
    </Card>
  )
}
