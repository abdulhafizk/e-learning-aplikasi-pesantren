"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, FileText, Home, LogOut, MessageSquare, User, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function UstadzDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for ustadz dashboard
  const ustadzData = {
    name: "Ustadz Abdullah",
    role: "Pengajar Fiqih",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    courses: [
      { id: 1, title: "Fiqih Kelas 1", students: 25, progress: 70, lastUpdated: "2 hari yang lalu" },
      { id: 2, title: "Fiqih Kelas 2", students: 20, progress: 65, lastUpdated: "1 minggu yang lalu" },
      { id: 3, title: "Fiqih Kelas 3", students: 18, progress: 80, lastUpdated: "3 hari yang lalu" },
    ],
    assignments: [
      {
        id: 1,
        title: "Rangkuman Bab 3 Fiqih",
        course: "Fiqih Kelas 1",
        dueDate: "25 April 2025",
        submissions: 15,
        totalStudents: 25,
      },
      {
        id: 2,
        title: "Latihan Soal Fiqih",
        course: "Fiqih Kelas 2",
        dueDate: "30 April 2025",
        submissions: 10,
        totalStudents: 20,
      },
      {
        id: 3,
        title: "Ujian Tengah Semester",
        course: "Fiqih Kelas 3",
        dueDate: "20 April 2025",
        submissions: 18,
        totalStudents: 18,
      },
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
    students: [
      { id: 1, name: "Ahmad Fauzi", class: "Kelas 2 Aliyah", progress: 85, lastActive: "Kemarin" },
      { id: 2, name: "Fatimah Azzahra", class: "Kelas 2 Aliyah", progress: 90, lastActive: "Hari ini" },
      { id: 3, name: "Muhammad Rizki", class: "Kelas 2 Aliyah", progress: 75, lastActive: "3 hari yang lalu" },
      { id: 4, name: "Aisyah Putri", class: "Kelas 2 Aliyah", progress: 80, lastActive: "Kemarin" },
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
            <span className="hidden md:inline-block">Selamat datang, {ustadzData.name}</span>
            <Avatar>
              <AvatarImage src={ustadzData.avatarUrl || "/placeholder.svg"} alt={ustadzData.name} />
              <AvatarFallback>{ustadzData.name.split(" ")[0].charAt(0)}</AvatarFallback>
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
              variant={activeTab === "students" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "students" ? "bg-green-700 hover:bg-green-800" : ""}`}
              onClick={() => setActiveTab("students")}
            >
              <Users className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Santri</span>
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
              <TabsTrigger value="students">Santri</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal</TabsTrigger>
              <TabsTrigger value="profile">Profil</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle>Selamat Datang, {ustadzData.name}</CardTitle>
                    <CardDescription>{ustadzData.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Kelola pelajaran dan tugas untuk santri Anda.</p>
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle>Pengumuman Terbaru</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ustadzData.announcements.map((announcement) => (
                      <div key={announcement.id} className="border-b pb-3 last:border-0 last:pb-0">
                        <h4 className="font-medium">{announcement.title}</h4>
                        <p className="text-sm text-gray-500">{announcement.date}</p>
                        <p className="mt-1 text-sm">{announcement.content}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      Buat Pengumuman Baru
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-lg font-medium mt-6">Pelajaran Saya</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ustadzData.courses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.students} santri</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress Kelas</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-sm text-gray-500">Terakhir diperbarui: {course.lastUpdated}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2">
                  <BookOpen className="h-10 w-10 text-gray-400 mb-2" />
                  <h3 className="font-medium text-lg">Tambah Pelajaran Baru</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">Buat pelajaran baru untuk santri Anda</p>
                  <Button className="bg-green-700 hover:bg-green-800">Tambah Pelajaran</Button>
                </Card>
              </div>

              <h3 className="text-lg font-medium mt-6">Tugas Terbaru</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {ustadzData.assignments.map((assignment) => (
                  <Card key={assignment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <Badge className="bg-green-700">
                          {assignment.submissions}/{assignment.totalStudents} Pengumpulan
                        </Badge>
                      </div>
                      <CardDescription>{assignment.course}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Tenggat waktu: {assignment.dueDate}</p>
                      <div className="mt-2">
                        <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Pelajaran Saya</h2>
                <Button className="bg-green-700 hover:bg-green-800">Tambah Pelajaran Baru</Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ustadzData.courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="h-32 bg-green-100 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-green-700" />
                    </div>
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.students} santri terdaftar</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress Kelas</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-sm text-gray-500">Terakhir diperbarui: {course.lastUpdated}</p>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0 flex gap-2">
                      <Button className="flex-1 bg-green-700 hover:bg-green-800">Kelola</Button>
                      <Button variant="outline" className="flex-1">
                        Lihat Santri
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Tugas</h2>
                <Button className="bg-green-700 hover:bg-green-800">Buat Tugas Baru</Button>
              </div>
              <Tabs defaultValue="active">
                <TabsList>
                  <TabsTrigger value="active">Aktif</TabsTrigger>
                  <TabsTrigger value="past">Selesai</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="mt-4">
                  <div className="space-y-4">
                    {ustadzData.assignments.map((assignment) => (
                      <Card key={assignment.id}>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>{assignment.title}</CardTitle>
                            <Badge className="bg-green-700">
                              {assignment.submissions}/{assignment.totalStudents} Pengumpulan
                            </Badge>
                          </div>
                          <CardDescription>{assignment.course}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Tenggat waktu: {assignment.dueDate}</p>
                          <div className="mt-4 flex gap-2">
                            <Button className="bg-green-700 hover:bg-green-800">Periksa Pengumpulan</Button>
                            <Button variant="outline">Edit Tugas</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="past" className="mt-4">
                  <div className="p-8 text-center text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Tidak ada tugas yang selesai</h3>
                    <p>Tugas yang telah melewati tenggat waktu akan muncul di sini.</p>
                  </div>
                </TabsContent>
                <TabsContent value="draft" className="mt-4">
                  <div className="p-8 text-center text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Tidak ada draft tugas</h3>
                    <p>Tugas yang disimpan sebagai draft akan muncul di sini.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Santri Saya</h2>
                <div className="flex gap-2">
                  <Button variant="outline">Filter</Button>
                  <Button className="bg-green-700 hover:bg-green-800">Tambah Santri</Button>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Daftar Santri</CardTitle>
                  <CardDescription>Santri yang terdaftar dalam pelajaran Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ustadzData.students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 bg-white border rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.class}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm">Progress: {student.progress}%</p>
                            <p className="text-xs text-gray-500">Aktif: {student.lastActive}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Lihat Detail
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistik Santri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Kehadiran Rata-rata</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
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
                    <CardTitle>Aktivitas Terbaru</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="bg-green-100 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <p className="font-medium">Ahmad Fauzi menyelesaikan tugas Fiqih</p>
                          <p className="text-sm text-gray-500">2 hari yang lalu</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="bg-green-100 p-2 rounded-full">
                          <MessageSquare className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <p className="font-medium">Fatimah Azzahra bertanya di forum diskusi</p>
                          <p className="text-sm text-gray-500">3 hari yang lalu</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="bg-green-100 p-2 rounded-full">
                          <BookOpen className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <p className="font-medium">Muhammad Rizki mengakses materi baru</p>
                          <p className="text-sm text-gray-500">1 minggu yang lalu</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Jadwal Mengajar</h2>
                <Button className="bg-green-700 hover:bg-green-800">Tambah Jadwal</Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Jadwal Mingguan</CardTitle>
                  <CardDescription>Jadwal mengajar untuk minggu ini</CardDescription>
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
                                <p className="font-medium">Fiqih Kelas 1</p>
                                <p className="text-sm text-gray-500">25 santri</p>
                              </div>
                              <p className="text-sm">07:30 - 09:00</p>
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">Fiqih Kelas 2</p>
                                <p className="text-sm text-gray-500">20 santri</p>
                              </div>
                              <p className="text-sm">09:30 - 11:00</p>
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">Fiqih Kelas 3</p>
                                <p className="text-sm text-gray-500">18 santri</p>
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
                        <AvatarImage src={ustadzData.avatarUrl || "/placeholder.svg"} alt={ustadzData.name} />
                        <AvatarFallback className="text-2xl">{ustadzData.name.split(" ")[0].charAt(0)}</AvatarFallback>
                      </Avatar>
                      <CardTitle>{ustadzData.name}</CardTitle>
                      <CardDescription>{ustadzData.role}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">ID Pengajar</p>
                        <p>UST001</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>abdullah@hubbulkhoir.ac.id</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Nomor Telepon</p>
                        <p>+62 812-3456-7890</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bergabung Sejak</p>
                        <p>15 Januari 2020</p>
                      </div>
                      <Button className="w-full bg-green-700 hover:bg-green-800">Edit Profil</Button>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistik Mengajar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Total Santri</span>
                            <span>63 santri</span>
                          </div>
                          <Progress value={63} max={100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Materi Terselesaikan</span>
                            <span>85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Nilai Rata-rata Santri</span>
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
                            <p className="font-medium">Menambahkan tugas baru untuk Fiqih Kelas 1</p>
                            <p className="text-sm text-gray-500">2 hari yang lalu</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="bg-green-100 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-green-700" />
                          </div>
                          <div>
                            <p className="font-medium">Memperbarui materi Fiqih Bab 3</p>
                            <p className="text-sm text-gray-500">3 hari yang lalu</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="bg-green-100 p-2 rounded-full">
                            <MessageSquare className="h-5 w-5 text-green-700" />
                          </div>
                          <div>
                            <p className="font-medium">Menjawab pertanyaan di forum diskusi</p>
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
