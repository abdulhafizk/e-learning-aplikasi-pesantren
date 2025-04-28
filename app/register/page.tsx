"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { signUp } from "@/app/actions/auth"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("santri")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    try {
      // Basic validation
      if (password !== confirmPassword) {
        toast({
          title: "Pendaftaran gagal",
          description: "Password dan konfirmasi password tidak cocok",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const result = await signUp(formData)

      if (result.error) {
        toast({
          title: "Pendaftaran gagal",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Pendaftaran berhasil!",
        description: "Akun Anda telah berhasil dibuat",
      })

      // Redirect to login page
      router.push("/login")
    } catch (error) {
      toast({
        title: "Pendaftaran gagal",
        description: "Terjadi kesalahan saat mendaftar",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <header className="bg-green-800 text-white py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-xl font-bold">E-Learning Hubbul Khoir</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Daftar Akun Baru</CardTitle>
            <CardDescription className="text-center">Isi formulir berikut untuk membuat akun baru</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">Daftar sebagai</Label>
                <RadioGroup
                  id="userType"
                  name="userType"
                  value={userType}
                  onValueChange={setUserType}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="santri" id="santri" />
                    <Label htmlFor="santri">Santri</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ustadz" id="ustadz" />
                    <Label htmlFor="ustadz">Ustadz</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input id="fullName" name="fullName" placeholder="Masukkan nama lengkap Anda" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="Masukkan username yang diinginkan" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="nama@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required />
              </div>
              {userType === "santri" && (
                <div className="space-y-2">
                  <Label htmlFor="class">Kelas</Label>
                  <Input id="class" name="class" placeholder="Contoh: Kelas 2 Aliyah" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Daftar"}
              </Button>
              <div className="text-center text-sm">
                Sudah memiliki akun?{" "}
                <Link href="/login" className="text-green-600 hover:underline">
                  Masuk sekarang
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>

      <footer className="bg-green-800 text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} E-Learning Pondok Pesantren Hubbul Khoir</p>
        </div>
      </footer>
    </div>
  )
}
