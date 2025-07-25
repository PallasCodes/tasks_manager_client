import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (window.innerWidth < 600) {
      setHiddenSidebar(true)
    }
  }, [window.innerWidth])

  return (
    <div className="flex flex-col h-screen">
      <Header hideSideBar={setHiddenSidebar} />

      <div className="flex flex-1 relative">
        <aside
          className={`absolute top-0 left-0 h-full md:w-72 z-20 bg-white dark:bg-black transform transition-transform duration-300 ease-in-out border-r md:right-auto right-0 w-full
            ${hiddenSidebar ? '-translate-x-full' : 'translate-x-0'}
          `}
        >
          <Sidebar />
        </aside>

        <main
          className={`transition-all duration-300 ease-in-out overflow-x-hidden w-full
              ${hiddenSidebar ? 'ml-0' : 'ml-72'}
            `}
        >
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
