import Header from '@/components/Header'
import { ScrollArea } from '@/components/ui/scroll-area'

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="bg-blue-200 min-h-screen">sidebar</div>

        <ScrollArea className="p-6 pt-20">{children}</ScrollArea>
      </div>
    </div>
  )
}

export default MainLayout
