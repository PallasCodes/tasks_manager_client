import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { CircleCheckBig, Plus, Star } from 'lucide-react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'

const Sidebar = () => {
  return (
    <aside className={`max-w-72 w-full min-h-[calc(screen - 50px)] p-4`}>
      <Button
        variant="secondary"
        className="text-md rounded-lg shadow-none py-6! px-4!"
      >
        <Plus className="size-5" /> Create
      </Button>
      <div className="flex flex-col mt-7">
        <Button className="bg-blue-50 rounded-3xl text-gray-900 justify-start gap-3 px-4! shadow-none! hover:bg-blue-200 transition-colors">
          <CircleCheckBig />
          All Tasks
        </Button>
        <Button
          variant="ghost"
          className="justify-start gap-3 rounded-3xl px-4!"
        >
          <Star />
          Pinned
        </Button>
      </div>
      <Accordion type="single" collapsible className="px-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>Lists</AccordionTrigger>
          <AccordionContent className="flex items-center gap-3">
            <Checkbox id="terms" className="size-4" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Today
            </label>
          </AccordionContent>
          <AccordionContent className="flex items-center gap-3">
            <Checkbox id="terms" className="size-4" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Tomorrow
            </label>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        variant="ghost"
        className="justify-start gap-3 rounded-3xl px-4! w-full font-semibold mt-4"
      >
        <Plus className="size-5" />
        Create List
      </Button>
    </aside>
  )
}

export default Sidebar
