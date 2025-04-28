"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { signIn } from "@/app/actions/auth"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await signIn(formData)

      if (result.error) {
        toast({
          title: "Login gagal",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Login berhasil!",
        description: "Selamat datang kembali",
      })

      // Redirect based on user role
      if (result.role === "santri") {
        router.push("/dashboard/santri")
      } else if (result.role === "ustadz") {
        router.push("/dashboard/ustadz")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Login gagal",
        description: "Terjadi kesalahan saat login",
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

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Masuk</CardTitle>
            <CardDescription className="text-center">
              Masukkan email dan password untuk mengakses akun Anda
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="nama@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
                    Lupa password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
              <div className="text-center text-sm">
                Belum memiliki akun?{" "}
                <Link href="/register" className="text-green-600 hover:underline">
                  Daftar sekarang
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
