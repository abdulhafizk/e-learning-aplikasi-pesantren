"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns"

interface CourseCardProps {
  id: string
  title: string
  description?: string | null
  coverImage?: string | null
  progress: number
  teacherName?: string
  lastAccessed?: string | null
  onContinue?: () => void
}

export function CourseCard({
  id,
  title,
  description,
  coverImage,
  progress,
  teacherName,
  lastAccessed,
  onContinue,
}: CourseCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = async () => {
    if (onContinue) {
      setIsLoading(true)
      await onContinue()
      setIsLoading(false)
    }
  }

  const formattedLastAccessed = lastAccessed
    ? formatDistanceToNow(new Date(lastAccessed), { addSuffix: true, locale: id })
    : "Belum pernah diakses"

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{teacherName || "Tidak ada pengajar"}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500">Terakhir diakses: {formattedLastAccessed}</p>
          <div className="pt-2">
            <Link href={`/dashboard/santri/courses/${id}`}>
              <Button className="w-full bg-green-700 hover:bg-green-800" onClick={handleContinue} disabled={isLoading}>
                {isLoading ? "Memuat..." : "Lanjutkan Belajar"}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
