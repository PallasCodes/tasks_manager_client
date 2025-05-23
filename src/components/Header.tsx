import { CheckCheck, CircleUserRound, Menu, Settings } from 'lucide-react'
import { Button } from './ui/button'
import type React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'

const Header = ({
  hideSideBar
}: {
  hideSideBar: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { logout } = useAuth()

  return (
    <nav className="sticky top-0 left-0 right-0 px-4 py-3 flex items-center justify-between z-10 bg-white">
      <div className="flex items-center justify-center gap-6">
        <Button
          variant="ghost"
          className="rounded-full"
          size="icon"
          onClick={() => hideSideBar((prev: boolean) => !prev)}
        >
          <Menu className="size-6 text-gray-600" />
        </Button>
        <div className="flex items-center gap-2">
          <CheckCheck className="text-green-800" />
          <span className="text-gray-800 font-bold text-xl">Tasks</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="rounded-full" size="icon">
          <Settings className="size-6 text-gray-600" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full" size="icon">
              <CircleUserRound className="size-6 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Header
