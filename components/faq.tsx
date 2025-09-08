import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export function FAQ({ items }: FAQProps) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, index) => (
        <Collapsible key={index}>
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50">
            <h3 className="text-xl font-semibold">{item.question}</h3>
            <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 bg-white rounded-b-lg shadow-sm">
            <p>{item.answer}</p>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
