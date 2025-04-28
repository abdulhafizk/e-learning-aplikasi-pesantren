"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, FileText, Home, LogOut, MessageSquare, User } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function SantriDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for santri dashboard
  const santriData = {
    name: "Ahmad Fauzi",
    class: "Kelas 2 Aliyah",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    courses: [
      { id: 1, title: "Fiqih", progress: 75, teacher: "Ustadz Abdullah", lastAccessed: "2 hari yang lalu" },
      { id: 2, title: "Tafsir Al-Quran", progress: 60, teacher: "Ustadz Mahmud", lastAccessed: "1 minggu yang lalu" },
      { id: 3, title: "Hadits", progress: 40, teacher: "Ustadz Hasan", lastAccessed: "3 hari yang lalu" },
      { id: 4, title: "Bahasa Arab", progress: 85, teacher: "Ustadz Yusuf", lastAccessed: "Kemarin" },
    ],
    assignments: [
      { id: 1, title: "Rangkuman Bab 3 Fiqih", course: "Fiqih", dueDate: "25 April 2025", status: "pending" },
      {
        id: 2,
        title: "Hafalan Surat Al-Baqarah",
        course: "Tafsir Al-Quran",
        dueDate: "30 April 2025",
        status: "pending",
      },
      { id: 3, title: "Tugas Bahasa Arab", course: "Bahasa Arab", dueDate: "20 April 2025", status: "completed" },
    ],
    announcements: [
      {
        id: 1,
        title: "Jadwal Ujian Semester",
        date: "15 April 2025",
        content: "Ujian semester akan dilaksanakan mulai tanggal 10 Mei 2025.",
      },
      {
        id: 2,
        title: "Libur Hari Raya",
        date: "10 April 2025",
        content: "Pesantren akan libur selama Hari Raya Idul Fitri mulai tanggal 1-7 Mei 2025.",
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      {/* Header */}
      <header className="bg-green-800 text-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-xl font-bold">E-Learning Hubbul Khoir</h1>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-block">Selamat datang, {santriData.name}</span>
            <Avatar>
              <AvatarImage src={santriData.avatarUrl || "/placeholder.svg"} alt={santriData.name} />
              <AvatarFallback>{santriData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Link href="/login">
              <Button variant="ghost" size="icon" className="text-white hover:bg-green-700">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-16 md:w-64 bg-white border-r border-gray-200 shrink-0">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "overview" ? "bg-green-700 hover:bg-green-800" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <Home className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Beranda</span>
            </Button>
            <Button
              variant={activeTab === "courses" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "courses" ? "bg-green-700 hover:bg-green-800" : ""}`}
              onClick={() => setActiveTab("courses")}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Pelajaran</span>
            </Button>
            <Button
              variant={activeTab === "assignments" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "assignments" ? "bg-green-700 hover:bg-green-800" : ""}`}
              onClick={() => setActiveTab("assignments")}
            >
              <FileText className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Tugas</span>
            </Button>
            <Button
              variant={activeTab === "schedule" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "schedule" ? "bg-green-700 hover:bg-green-800" : ""}`}
              onClick={() => setActiveTab("schedule")}
            >
              <Calendar className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Jadwal</span>
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "profile" ? "bg-green-700 hover:bg-green-800" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Profil</span>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="hidden">
              <TabsTrigger value="overview">Beranda</TabsTrigger>
              <TabsTrigger value="courses">Pelajaran</TabsTrigger>
              <TabsTrigger value="assignments">Tugas</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal</TabsTrigger>
              <TabsTrigger value="profile">Profil</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle>Selamat Datang, {santriData.name}</CardTitle>
                    <CardDescription>{santriData.class}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Lanjutkan pembelajaran Anda dan selesaikan tugas-tugas yang tersedia.</p>
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle>Pengumuman Terbaru</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {santriData.announcements.map((announcement) => (
                      <div key={announcement.id} className="border-b pb-3 last:border-0 last:pb-0">
                        <h4 className="font-medium">{announcement.title}</h4>
                        <p className="text-sm text-gray-500">{announcement.date}</p>
                        <p className="mt-1 text-sm">{announcement.content}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-lg font-medium mt-6">Pelajaran Aktif</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {santriData.courses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.teacher}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-sm text-gray-500">Terakhir diakses: {course.lastAccessed}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h3 className="text-lg font-medium mt-6">Tugas Mendatang</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {santriData.assignments
                  .filter((a) => a.status === "pending")
                  .map((assignment) => (
                    <Card key={assignment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <Badge
                            variant={assignment.status === "completed" ? "outline" : "default"}
                            className="bg-green-700"
                          >
                            {assignment.status === "completed" ? "Selesai" : "Belum Selesai"}
                          </Badge>
                        </div>
                        <CardDescription>{assignment.course}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Tenggat waktu: {assignment.dueDate}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <h2 className="text-2xl font-bold">Pelajaran Saya</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {santriData.courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="h-32 bg-green-100 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-green-700" />
                    </div>
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.teacher}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0">
                      <Button className="w-full bg-green-700 hover:bg-green-800">Lanjutkan Belajar</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments" className="space-y-6">
              <h2 className="text-2xl font-bold">Tugas Saya</h2>
              <Tabs defaultValue="pending">
                <TabsList>
                  <TabsTrigger value="pending">Belum Selesai</TabsTrigger>
                  <TabsTrigger value="completed">Selesai</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="mt-4">
                  <div className="space-y-4">
                    {santriData.assignments
                      .filter((a) => a.status === "pending")
                      .map((assignment) => (
                        <Card key={assignment.id}>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <CardTitle>{assignment.title}</CardTitle>
                              <Badge className="bg-green-700">Belum Selesai</Badge>
                            </div>
                            <CardDescription>{assignment.course}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>Tenggat waktu: {assignment.dueDate}</p>
                            <div className="mt-4 flex gap-2">
                              <Button className="bg-green-700 hover:bg-green-800">Kerjakan Tugas</Button>
                              <Button variant="outline">Lihat Detail</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="completed" className="mt-4">
                  <div className="space-y-4">
                    {santriData.assignments
                      .filter((a) => a.status === "completed")
                      .map((assignment) => (
                        <Card key={assignment.id}>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <CardTitle>{assignment.title}</CardTitle>
                              <Badge variant="outline">Selesai</Badge>
                            </div>
                            <CardDescription>{assignment.course}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>Tenggat waktu: {assignment.dueDate}</p>
                            <div className="mt-4">
                              <Button variant="outline">Lihat Hasil</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Schedule Tab */}
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

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <h2 className="text-2xl font-bold">Profil Saya</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <Card className="md:w-1/3">
                  <CardHeader>
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={santriData.avatarUrl || "/placeholder.svg"} alt={santriData.name} />
                        <AvatarFallback className="text-2xl">{santriData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <CardTitle>{santriData.name}</CardTitle>
                      <CardDescription>{santriData.class}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">NIS</p>
                        <p>2023001</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>ahmad.fauzi@example.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Alamat</p>
                        <p>Jl. Pesantren No. 123, Kota</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tanggal Lahir</p>
                        <p>15 Januari 2005</p>
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
                      <div className="space-y-4">
                        <div className="flex gap-4 items-start">
                          <div className="bg-green-100 p-2 rounded-full">
                            <FileText className="h-5 w-5 text-green-700" />
                          </div>
                          <div>
                            <p className="font-medium">Menyelesaikan tugas Bahasa Arab</p>
                            <p className="text-sm text-gray-500">2 hari yang lalu</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="bg-green-100 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-green-700" />
                          </div>
                          <div>
                            <p className="font-medium">Mengakses materi Fiqih Bab 3</p>
                            <p className="text-sm text-gray-500">3 hari yang lalu</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="bg-green-100 p-2 rounded-full">
                            <MessageSquare className="h-5 w-5 text-green-700" />
                          </div>
                          <div>
                            <p className="font-medium">Berpartisipasi dalam diskusi Tafsir Al-Quran</p>
                            <p className="text-sm text-gray-500">1 minggu yang lalu</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
