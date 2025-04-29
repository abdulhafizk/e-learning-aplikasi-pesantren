"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash2, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface CourseCardUstadzProps {
  id: string
  title: string
  description?: string | null
  coverImage?: string | null
  isPublished: boolean
  studentsCount?: number
  onDelete: (id: string) => Promise<{ error?: string; success?: boolean }>
}

export function CourseCardUstadz({
  id,
  title,
  description,
  coverImage,
  isPublished,
  studentsCount = 0,
  onDelete,
}: CourseCardUstadzProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await onDelete(id)
      if (result.error) {
        toast({
          title: "Gagal menghapus kursus",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Kursus berhasil dihapus",
        description: "Kursus telah berhasil dihapus",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Gagal menghapus kursus",
        description: "Terjadi kesalahan saat menghapus kursus",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Users className="h-4 w-4" /> {studentsCount} santri terdaftar
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isPublished ? "default" : "outline"} className={isPublished ? "bg-green-700" : ""}>
                {isPublished ? "Dipublikasikan" : "Draft"}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href={`/dashboard/ustadz/courses/${id}/edit`}>
                    <DropdownMenuItem>
                      <Pencil className="h-4 w-4 mr-2" /> Edit Kursus
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" /> Hapus Kursus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-2 mb-4">{description || "Tidak ada deskripsi"}</p>
          <div className="flex gap-2">
            <Link href={`/dashboard/ustadz/courses/${id}`} className="flex-1">
              <Button className="w-full bg-green-700 hover:bg-green-800">Kelola</Button>
            </Link>
            <Link href={`/dashboard/ustadz/courses/${id}/students`} className="flex-1">
              <Button variant="outline" className="w-full">
                Lihat Santri
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kursus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus kursus ini? Tindakan ini tidak dapat dibatalkan dan semua materi dalam
              kursus ini akan dihapus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
