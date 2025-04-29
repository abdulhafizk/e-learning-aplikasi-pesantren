import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, FileText, Home, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LogoutButton } from "@/components/logout-button"
import { CourseCard } from "@/components/dashboard/course-card"
import { AnnouncementCard } from "@/components/dashboard/announcement-card"
import { getEnrollments } from "@/app/actions/enrollments"
import { getAnnouncements } from "@/app/actions/announcements"
import { getUserProfile } from "@/app/actions/auth"
import { Skeleton } from "@/components/ui/skeleton"

export const dynamic = "force-dynamic"

export default async function SantriDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Suspense fallback={<DashboardHeaderSkeleton />}>
        <DashboardHeader />
      </Suspense>

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="hidden">
              <TabsTrigger value="overview">Beranda</TabsTrigger>
              <TabsTrigger value="courses">Pelajaran</TabsTrigger>
              <TabsTrigger value="assignments">Tugas</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal</TabsTrigger>
              <TabsTrigger value="profile">Profil</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Suspense fallback={<WelcomeCardSkeleton />}>
                  <WelcomeCard />
                </Suspense>
                <Suspense fallback={<AnnouncementsCardSkeleton />}>
                  <AnnouncementsCard />
                </Suspense>
              </div>

              <h3 className="text-lg font-medium mt-6">Pelajaran Aktif</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={<CourseCardsSkeleton count={3} />}>
                  <ActiveCourses />
                </Suspense>
              </div>

              <h3 className="text-lg font-medium mt-6">Tugas Mendatang</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Rangkuman Bab 3 Fiqih</CardTitle>
                      <Badge className="bg-green-700">Belum Selesai</Badge>
                    </div>
                    <CardDescription>Fiqih</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Tenggat waktu: 25 April 2025</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Hafalan Surat Al-Baqarah</CardTitle>
                      <Badge className="bg-green-700">Belum Selesai</Badge>
                    </div>
                    <CardDescription>Tafsir Al-Quran</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Tenggat waktu: 30 April 2025</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <h2 className="text-2xl font-bold">Pelajaran Saya</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Suspense fallback={<CourseCardsSkeleton count={6} />}>
                  <AllCourses />
                </Suspense>
              </div>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-6">
              <h2 className="text-2xl font-bold">Tugas Saya</h2>
              <Tabs defaultValue="pending">
                <TabsList>
                  <TabsTrigger value="pending">Belum Selesai</TabsTrigger>
                  <TabsTrigger value="completed">Selesai</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="mt-4">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Rangkuman Bab 3 Fiqih</CardTitle>
                          <Badge className="bg-green-700">Belum Selesai</Badge>
                        </div>
                        <CardDescription>Fiqih</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Tenggat waktu: 25 April 2025</p>
                        <div className="mt-4 flex gap-2">
                          <Button className="bg-green-700 hover:bg-green-800">Kerjakan Tugas</Button>
                          <Button variant="outline">Lihat Detail</Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Hafalan Surat Al-Baqarah</CardTitle>
                          <Badge className="bg-green-700">Belum Selesai</Badge>
                        </div>
                        <CardDescription>Tafsir Al-Quran</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Tenggat waktu: 30 April 2025</p>
                        <div className="mt-4 flex gap-2">
                          <Button className="bg-green-700 hover:bg-green-800">Kerjakan Tugas</Button>
                          <Button variant="outline">Lihat Detail</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="completed" className="mt-4">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Tugas Bahasa Arab</CardTitle>
                          <Badge variant="outline">Selesai</Badge>
                        </div>
                        <CardDescription>Bahasa Arab</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Tenggat waktu: 20 April 2025</p>
                        <div className="mt-4">
                          <Button variant="outline">Lihat Hasil</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <h2 className="text-2xl font-bold">Jadwal Pelajaran</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Jadwal Mingguan</CardTitle>
                  <CardDescription>Jadwal pelajaran untuk minggu ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map((day) => (
                      <div key={day} className="border-b pb-4 last:border-0">
                        <h3 className="font-medium text-lg mb-2">{day}</h3>
                        <div className="space-y-2">
                          <div className="bg-green-50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">Fiqih</p>
                                <p className="text-sm text-gray-500">Ustadz Abdullah</p>
                              </div>
                              <p className="text-sm">07:30 - 09:00</p>
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">Tafsir Al-Quran</p>
                                <p className="text-sm text-gray-500">Ustadz Mahmud</p>
                              </div>
                              <p className="text-sm">09:30 - 11:00</p>
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">Bahasa Arab</p>
                                <p className="text-sm text-gray-500">Ustadz Yusuf</p>
                              </div>
                              <p className="text-sm">13:00 - 14:30</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Suspense fallback={<ProfileSkeleton />}>
                <ProfileContent />
              </Suspense>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

async function DashboardHeader() {
  const profile = await getUserProfile()

  return (
    <header className="bg-green-800 text-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <h1 className="text-xl font-bold">E-Learning Hubbul Khoir</h1>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block">Selamat datang, {profile?.full_name || "Santri"}</span>
          <Avatar>
            <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name || "Santri"} />
            <AvatarFallback>{(profile?.full_name || "S").charAt(0)}</AvatarFallback>
          </Avatar>
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}

function DashboardHeaderSkeleton() {
  return (
    <header className="bg-green-800 text-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <h1 className="text-xl font-bold">E-Learning Hubbul Khoir</h1>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-40 bg-green-700 hidden md:block" />
          <Skeleton className="h-10 w-10 rounded-full bg-green-700" />
          <Skeleton className="h-10 w-10 rounded-full bg-green-700" />
        </div>
      </div>
    </header>
  )
}

function DashboardSidebar() {
  return (
    <aside className="w-16 md:w-64 bg-white border-r border-gray-200 shrink-0">
      <nav className="p-4 space-y-2">
        <Link href="/dashboard/santri">
          <Button variant="default" className="w-full justify-start bg-green-700 hover:bg-green-800">
            <Home className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Beranda</span>
          </Button>
        </Link>
        <Link href="/dashboard/santri?tab=courses">
          <Button variant="ghost" className="w-full justify-start">
            <BookOpen className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Pelajaran</span>
          </Button>
        </Link>
        <Link href="/dashboard/santri?tab=assignments">
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Tugas</span>
          </Button>
        </Link>
        <Link href="/dashboard/santri?tab=schedule">
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Jadwal</span>
          </Button>
        </Link>
        <Link href="/dashboard/santri?tab=profile">
          <Button variant="ghost" className="w-full justify-start">
            <User className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Profil</span>
          </Button>
        </Link>
      </nav>
    </aside>
  )
}

async function WelcomeCard() {
  const profile = await getUserProfile()

  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle>Selamat Datang, {profile?.full_name || "Santri"}</CardTitle>
        <CardDescription>{profile?.class || "Santri"}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Lanjutkan pembelajaran Anda dan selesaikan tugas-tugas yang tersedia.</p>
      </CardContent>
    </Card>
  )
}

function WelcomeCardSkeleton() {
  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  )
}

async function AnnouncementsCard() {
  const { data: announcements, error } = await getAnnouncements()

  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle>Pengumuman Terbaru</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? (
          <p className="text-red-500">Gagal memuat pengumuman: {error}</p>
        ) : announcements && announcements.length > 0 ? (
          announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              id={announcement.id}
              title={announcement.title}
              content={announcement.content}
              createdAt={announcement.created_at}
              authorName={announcement.users?.full_name}
            />
          ))
        ) : (
          <p className="text-gray-500">Tidak ada pengumuman terbaru</p>
        )}
      </CardContent>
    </Card>
  )
}

function AnnouncementsCardSkeleton() {
  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-1/2 mb-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

async function ActiveCourses() {
  const { data: enrollments, error } = await getEnrollments()

  if (error) {
    return <p className="text-red-500 col-span-full">Gagal memuat kursus: {error}</p>
  }

  if (!enrollments || enrollments.length === 0) {
    return (
      <p className="text-gray-500 col-span-full">
        Anda belum terdaftar dalam kursus apapun.{" "}
        <Link href="/dashboard/santri/browse-courses" className="text-green-700 hover:underline">
          Jelajahi kursus
        </Link>
      </p>
    )
  }

  // Sort by last accessed and limit to 3
  const sortedEnrollments = [...enrollments]
    .sort((a, b) => {
      if (!a.last_accessed) return 1
      if (!b.last_accessed) return -1
      return new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime()
    })
    .slice(0, 3)

  return (
    <>
      {sortedEnrollments.map((enrollment) => (
        <CourseCard
          key={enrollment.id}
          id={enrollment.courses?.id || ""}
          title={enrollment.courses?.title || ""}
          description={enrollment.courses?.description}
          coverImage={enrollment.courses?.cover_image}
          progress={enrollment.progress}
          teacherName={enrollment.courses?.users?.full_name}
          lastAccessed={enrollment.last_accessed}
        />
      ))}
    </>
  )
}

async function AllCourses() {
  const { data: enrollments, error } = await getEnrollments()

  if (error) {
    return <p className="text-red-500 col-span-full">Gagal memuat kursus: {error}</p>
  }

  if (!enrollments || enrollments.length === 0) {
    return (
      <p className="text-gray-500 col-span-full">
        Anda belum terdaftar dalam kursus apapun.{" "}
        <Link href="/dashboard/santri/browse-courses" className="text-green-700 hover:underline">
          Jelajahi kursus
        </Link>
      </p>
    )
  }

  return (
    <>
      {enrollments.map((enrollment) => (
        <CourseCard
          key={enrollment.id}
          id={enrollment.courses?.id || ""}
          title={enrollment.courses?.title || ""}
          description={enrollment.courses?.description}
          coverImage={enrollment.courses?.cover_image}
          progress={enrollment.progress}
          teacherName={enrollment.courses?.users?.full_name}
          lastAccessed={enrollment.last_accessed}
        />
      ))}
      <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2">
        <BookOpen className="h-10 w-10 text-gray-400 mb-2" />
        <h3 className="font-medium text-lg">Jelajahi Kursus</h3>
        <p className="text-sm text-gray-500 text-center mb-4">Temukan kursus baru untuk dipelajari</p>
        <Link href="/dashboard/santri/browse-courses">
          <Button className="bg-green-700 hover:bg-green-800">Jelajahi Kursus</Button>
        </Link>
      </Card>
    </>
  )
}

function CourseCardsSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-9 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

async function ProfileContent() {
  const profile = await getUserProfile()

  return (
    <>
      <h2 className="text-2xl font-bold">Profil Saya</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/3">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name || "Santri"} />
                <AvatarFallback className="text-2xl">{(profile?.full_name || "S").charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{profile?.full_name || "Santri"}</CardTitle>
              <CardDescription>{profile?.class || "Santri"}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p>{profile?.username || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{profile?.id || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Kelas</p>
                <p>{profile?.class || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bergabung Sejak</p>
                <p>
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>
              </div>
              <Button className="w-full bg-green-700 hover:bg-green-800">Edit Profil</Button>
            </div>
          </CardContent>
        </Card>
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistik Pembelajaran</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Kehadiran</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Penyelesaian Tugas</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Nilai Rata-rata</span>
                    <span>88/100</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Aktivitas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Riwayat aktivitas akan ditampilkan di sini.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

function ProfileSkeleton() {
  return (
    <>
      <Skeleton className="h-8 w-40 mb-6" />
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/3">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Skeleton className="h-24 w-24 rounded-full mb-4" />
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton className="h-3 w-20 mb-1" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
