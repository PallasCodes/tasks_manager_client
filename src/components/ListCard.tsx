import type { List as ListCard } from '@/types/list.interface'
import { CheckLine, Circle, EllipsisVertical } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const ListCard = ({ list }: { list: ListCard }) => {
  return (
    <Card className="shrink-0 grow min-w-sm max-w-lg w-full gap-2! py-5!">
      <CardHeader className="relative px-4!">
        <CardTitle>{list.title}</CardTitle>
        <Button
          variant="ghost"
          className="rounded-full absolute top-[-14px] right-1 size-8"
        >
          <EllipsisVertical className="size-5 text-gray-700" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col px-0!">
        <Button
          variant="ghost"
          className="text-blue-400 justify-start px-4! hover:bg-blue-50 transition-colors hover:text-text-blue-600"
        >
          <CheckLine />
          Add a task
        </Button>
        {list.tasks?.map((task) => (
          <div
            key={task.id}
            className="w-full flex items-center gap-1.5 hover:bg-blue-50 transition-colors px-2 py-1"
          >
            <Button variant="ghost" className="rounded-full size-7">
              <Circle />
            </Button>
            <span className="text-sm text-gray-800">{task.title}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default ListCard
