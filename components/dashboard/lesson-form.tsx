"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface LessonFormProps {
  id?: string
  courseId: string
  defaultValues?: {
    title?: string
    content?: string
    orderIndex?: number
  }
  onSubmit: (formData: FormData) => Promise<{ error?: string; success?: boolean }>
  submitLabel?: string
  cancelHref?: string
}

export function LessonForm({
  id,
  courseId,
  defaultValues = {},
  onSubmit,
  submitLabel = "Simpan",
  cancelHref,
}: LessonFormProps) {
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
          title: "Gagal menyimpan materi",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Materi berhasil disimpan",
        description: "Materi pembelajaran telah berhasil disimpan",
      })

      // Redirect to course page
      router.push(cancelHref || `/dashboard/ustadz/courses/${courseId}`)
      router.refresh()
    } catch (error) {
      toast({
        title: "Gagal menyimpan materi",
        description: "Terjadi kesalahan saat menyimpan materi",
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
          <CardTitle>{id ? "Edit Materi" : "Tambah Materi Baru"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {id && <Input type="hidden" name="lessonId" value={id} />}
          <Input type="hidden" name="courseId" value={courseId} />
          <div className="space-y-2">
            <Label htmlFor="title">Judul Materi</Label>
            <Input
              id="title"
              name="title"
              placeholder="Masukkan judul materi"
              defaultValue={defaultValues.title || ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Konten</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Masukkan konten materi"
              defaultValue={defaultValues.content || ""}
              rows={10}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orderIndex">Urutan</Label>
            <Input
              id="orderIndex"
              name="orderIndex"
              type="number"
              min="0"
              placeholder="Urutan materi"
              defaultValue={defaultValues.orderIndex?.toString() || "0"}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push(cancelHref || `/dashboard/ustadz/courses/${courseId}`)}
            disabled={isLoading}
          >
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
