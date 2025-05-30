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
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const Header = ({
  hideSideBar
}: {
  hideSideBar: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { logout } = useAuth()
  const { refetch, isFetching } = useGetLists()
  const { t, i18n } = useTranslation()

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    localStorage.setItem(
      'darkMode',
      document.documentElement.classList.contains('dark') ? 'true' : 'false'
    )
  }

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
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
            <span>{t('header.syncTasks')}</span>
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
              {t('header.toggleDarkMode')}
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {t('header.language')}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => switchLanguage('en')}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchLanguage('es')}>
                    Español
                  </DropdownMenuItem>
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
              {t('header.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Header
