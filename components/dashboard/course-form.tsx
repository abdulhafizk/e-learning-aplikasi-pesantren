"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface CourseFormProps {
  id?: string
  defaultValues?: {
    title?: string
    description?: string
    isPublished?: boolean
  }
  onSubmit: (formData: FormData) => Promise<{ error?: string; success?: boolean }>
  submitLabel?: string
  cancelHref?: string
}

export function CourseForm({
  id,
  defaultValues = {},
  onSubmit,
  submitLabel = "Simpan",
  cancelHref = "/dashboard/ustadz/courses",
}: CourseFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await onSubmit(formData)

      if (result.error) {
        toast({
          title: "Gagal menyimpan kursus",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Kursus berhasil disimpan",
        description: "Kursus telah berhasil disimpan",
      })

      // Redirect to courses page
      router.push(cancelHref)
      router.refresh()
    } catch (error) {
      toast({
        title: "Gagal menyimpan kursus",
        description: "Terjadi kesalahan saat menyimpan kursus",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{id ? "Edit Kursus" : "Buat Kursus Baru"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {id && <Input type="hidden" name="id" value={id} />}
          <div className="space-y-2">
            <Label htmlFor="title">Judul Kursus</Label>
            <Input
              id="title"
              name="title"
              placeholder="Masukkan judul kursus"
              defaultValue={defaultValues.title || ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Masukkan deskripsi kursus"
              defaultValue={defaultValues.description || ""}
              rows={5}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isPublished"
              name="isPublished"
              defaultChecked={defaultValues.isPublished || false}
              value="true"
            />
            <Label htmlFor="isPublished">Publikasikan kursus</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.push(cancelHref)} disabled={isLoading}>
            Batal
          </Button>
          <Button type="submit" className="bg-green-700 hover:bg-green-800" disabled={isLoading}>
            {isLoading ? "Menyimpan..." : submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
