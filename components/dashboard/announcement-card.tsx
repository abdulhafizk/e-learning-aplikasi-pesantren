import { formatDistanceToNow } from "date-fns"

interface AnnouncementCardProps {
  id: string
  title: string
  content: string
  createdAt: string
  authorName?: string
}

export function AnnouncementCard({ id, title, content, createdAt, authorName }: AnnouncementCardProps) {
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: id })

  return (
    <div className="border-b pb-3 last:border-0 last:pb-0">
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-500">
        {formattedDate} {authorName ? `oleh ${authorName}` : ""}
      </p>
      <p className="mt-1 text-sm">{content}</p>
    </div>
  )
}
