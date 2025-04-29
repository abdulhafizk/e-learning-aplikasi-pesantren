import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ChevronLeft } from "lucide-react"
import { getCourses } from "@/app/actions/courses"
import { enrollInCourse } from "@/app/actions/enrollments"
import { Skeleton } from "@/components/ui/skeleton"

export const dynamic = "force-dynamic"

export default function BrowseCoursesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/santri">
          <Button variant="ghost" size="sm" className="mr-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Jelajahi Kursus</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<CourseCardsSkeleton count={6} />}>
          <AvailableCourses />
        </Suspense>
      </div>
    </div>
  )
}

async function AvailableCourses() {
  const { data: courses, error } = await getCourses()

  if (error) {
    return <p className="text-red-500 col-span-full">Gagal memuat kursus: {error}</p>
  }

  if (!courses || courses.length === 0) {
    return <p className="text-gray-500 col-span-full">Tidak ada kursus yang tersedia saat ini.</p>
  }

  return (
    <>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          description={course.description}
          teacherName={course.users?.full_name}
          coverImage={course.cover_image}
        />
      ))}
    </>
  )
}

function CourseCardsSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <div className="h-32 bg-gray-200 animate-pulse" />
          <CardHeader>
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-9 w-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}

function CourseCard({
  id,
  title,
  description,
  teacherName,
  coverImage,
}: {
  id: string
  title: string
  description: string | null
  teacherName?: string
  coverImage?: string | null
}) {
  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-green-100 flex items-center justify-center">
        {coverImage ? (
          <img src={coverImage || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        ) : (
          <BookOpen className="h-12 w-12 text-green-700" />
        )}
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{teacherName ? `Pengajar: ${teacherName}` : "Tidak ada pengajar"}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{description || "Tidak ada deskripsi"}</p>
      </CardContent>
      <CardFooter>
        <EnrollButton courseId={id} />
      </CardFooter>
    </Card>
  )
}

function EnrollButton({ courseId }: { courseId: string }) {
  async function handleEnroll() {
    "use server"
    return await enrollInCourse(courseId)
  }

  return (
    <form action={handleEnroll} className="w-full">
      <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
        Daftar Kursus
      </Button>
    </form>
  )
}
