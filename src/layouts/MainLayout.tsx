import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useState } from 'react'

const MainLayout = ({ children }: React.PropsWithChildren) => {
  const [hiddenSidebar, setHiddenSidebar] = useState(false)

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header hideSideBar={setHiddenSidebar} />

      <div className="flex flex-1 relative overflow-hidden">
        <aside
          className={`absolute top-0 left-0 h-full w-72 z-20 bg-white dark:bg-black transform transition-transform duration-300 ease-in-out border-r
            ${hiddenSidebar ? '-translate-x-full' : 'translate-x-0'}
          `}
        >
          <Sidebar />
        </aside>

        <main
          className={`flex-1 h-full transition-all duration-300 ease-in-out
              ${hiddenSidebar ? 'ml-0' : 'ml-72'}
            `}
        >
          <div className="h-full overflow-x-auto overflow-y-hidden p-6 flex gap-6 custom-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
