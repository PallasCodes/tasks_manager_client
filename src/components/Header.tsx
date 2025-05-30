import { useGetLists } from '@/api/lists.api'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'
import {
  CheckCheck,
  CircleUserRound,
  Menu,
  RotateCw,
  Settings
} from 'lucide-react'
import type React from 'react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const Header = ({
  hideSideBar
}: {
  hideSideBar: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { logout } = useAuth()
  const { refetch, isFetching } = useGetLists()

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    localStorage.setItem(
      'darkMode',
      document.documentElement.classList.contains('dark') ? 'true' : 'false'
    )
  }

  return (
    <nav className="sticky top-0 left-0 right-0 px-4 py-3 flex items-center justify-between z-10 bg-white dark:bg-black">
      <div className="flex items-center justify-center gap-6">
        <Button
          variant="ghost"
          className="rounded-full"
          size="icon"
          onClick={() => hideSideBar((prev: boolean) => !prev)}
        >
          <Menu className="size-6 text-gray-600 dark:text-gray-200" />
        </Button>
        <div className="flex items-center gap-2">
          <CheckCheck className="text-green-800" />
          <span className="text-gray-800 font-bold text-xl dark:text-gray-200">
            Tasks
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full"
              size="icon"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RotateCw
                className={`size-6 text-gray-600 dark:text-gray-200 ${
                  isFetching ? 'animate-spin' : ''
                }`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Sync Tasks</span>
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full" size="icon">
              <Settings className="size-6 text-gray-600 dark:text-gray-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={toggleDarkMode}
            >
              Toggle dark mode
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Language</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Español</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full" size="icon">
              <CircleUserRound className="size-6 text-gray-700 dark:text-gray-200" />
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
