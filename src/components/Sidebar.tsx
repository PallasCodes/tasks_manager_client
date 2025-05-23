import { CircleCheckBig, Plus, Star } from 'lucide-react'
import { Button } from './ui/button'

const Sidebar = () => {
  return (
    <aside className={`max-w-72 w-full min-h-[calc(screen - 50px)] p-4`}>
      <Button variant="secondary" className="text-md w-full rounded-lg">
        <Plus className="size-5" /> Create
      </Button>
      <div className="flex flex-col mt-8">
        <Button className="bg-blue-100 rounded-3xl text-gray-900 justify-start gap-3 px-4! shadow-none! hover:bg-blue-200 transition-colors">
          <CircleCheckBig />
          Todas las tareas
        </Button>
        <Button
          variant="ghost"
          className="justify-start gap-3 rounded-3xl px-4!"
        >
          <Star />
          Destacadas
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar
