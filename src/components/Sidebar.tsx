import { useState } from 'react'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { CircleCheckBig, Plus, Star } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { useTasks } from '@/context/TasksContext'
import CreateListDialog from './CreateListDialog'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import CreateTaskDialog from './CreateTaskDialog'

const Sidebar = () => {
  const { lists, toggleList } = useTasks()
  const [createListOpen, setCreateListOpen] = useState(false)
  const [showCreateTask, setShowCreateTask] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="min-w-60 max-w-72 w-full min-h-[calc(screen - 50px)] p-4">
      <CreateTaskDialog
        open={showCreateTask}
        close={() => setShowCreateTask(false)}
      >
        <Button
          variant="secondary"
          className="text-md rounded-lg shadow-none py-6! px-4!"
          onClick={() => setShowCreateTask(true)}
        >
          <Plus className="size-5" /> Create
        </Button>
      </CreateTaskDialog>

      <div className="flex flex-col mt-7">
        <Button
          variant="ghost"
          className={`rounded-3xl justify-start gap-3 px-4! py-0! ${
            pathname === '/'
              ? 'dark:bg-[#004a77] text-[rgba(0, 0, 0, 0.87)] dark:hover:bg-[#035080] bg-blue-200 hover:bg-blue-200'
              : ''
          }`}
          onClick={() => navigate('/')}
        >
          <CircleCheckBig />
          All Tasks
        </Button>
        <Button
          variant="ghost"
          className={`justify-start gap-3 rounded-3xl px-4! py-0! ${
            pathname === '/pinned'
              ? 'dark:bg-[#004a77] text-[rgba(0, 0, 0, 0.87)] dark:hover:bg-[#035080] bg-blue-200 hover:bg-blue-200'
              : ''
          }`}
          onClick={() => navigate('/pinned')}
        >
          <Star />
          Pinned
        </Button>
      </div>
      <Accordion
        type="single"
        collapsible
        className="px-4"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Lists</AccordionTrigger>
          {lists?.map((list) => (
            <AccordionContent
              className="flex items-center gap-3 w-full"
              key={list.id}
            >
              <Checkbox
                id={`list-${list.id}`}
                className="size-4"
                checked={!list.hidden}
                onCheckedChange={() => toggleList(list.id as string)}
              />
              <label
                htmlFor={`list-${list.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full"
              >
                {list.title}
              </label>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
      <CreateListDialog
        open={createListOpen}
        close={() => setCreateListOpen(false)}
      >
        <Button
          variant="ghost"
          className="justify-start gap-3 rounded-3xl px-4! w-full font-semibold mt-4"
          onClick={() => setCreateListOpen(true)}
        >
          <Plus className="size-5" />
          Create List
        </Button>
      </CreateListDialog>
    </div>
  )
}

export default Sidebar
