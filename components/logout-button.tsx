"// "use client""

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "@/app/actions/auth"

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  showText?: boolean
}

export function LogoutButton({ variant = "ghost", size = "icon", showText = false }: LogoutButtonProps) {
  return (
    <form action={signOut}>
      <Button variant={variant} size={size} type="submit" className="text-white hover:bg-green-700">
        <LogOut className="h-5 w-5" />
        {showText && <span className="ml-2">Logout</span>}
        {!showText && <span className="sr-only">Logout</span>}
      </Button>
    </form>
  )
}
