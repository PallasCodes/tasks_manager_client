import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'

const MainLayout = ({ children }: React.PropsWithChildren) => {
  const [hiddenSidebar, setHiddenSidebar] = useState(false)

  return (
    <div>
      <Header hideSideBar={setHiddenSidebar} />
      <div
        className={`flex transform transition-transform duration-500 ease-in-out ${
          hiddenSidebar ? '-translate-x-72' : 'translate-x-0'
        }`}
      >
        <Sidebar />
        <ScrollArea className="p-6">{children}</ScrollArea>
      </div>
    </div>
  )
}

export default MainLayout
