import type { List as ListCard } from '@/types/list.interface'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const ListCard = ({ list }: { list: ListCard }) => {
  return (
    <Card className="shrink-0 grow min-w-sm max-w-lg w-full">
      <CardHeader>
        <CardTitle>{list.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {list.tasks?.map((task) => (
          <span key={task.id}>{task.title}</span>
        ))}
      </CardContent>
    </Card>
  )
}

export default ListCard
