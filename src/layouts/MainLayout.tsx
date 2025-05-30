import { motion } from 'framer-motion'
import { useState } from 'react'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const pageVariants = {
  initial: {
    opacity: 0,
    x: 100
  },
  in: {
    opacity: 1,
    x: 0
  },
  out: {
    opacity: 0,
    x: -100
  }
}

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.2
}

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
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="p-4"
          >
            <div className="h-full overflow-x-auto overflow-y-hidden p-6 flex gap-6 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
