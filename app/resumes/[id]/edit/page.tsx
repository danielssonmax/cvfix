import { ResumeEditor } from "@/components/resume-editor"
import { Progress } from "@/components/ui/progress"

export default function EditResumePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <nav className="flex items-center space-x-4">
              <span className="text-sm font-medium">Mitt CV</span>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-sm">Spara</button>
              <button className="text-sm">Förhandsgranska</button>
              <button className="text-sm">Ladda ner</button>
            </div>
          </div>
        </div>
      </header>
      <div className="bg-zinc-800 py-4">
        <div className="container mx-auto px-4">
          <Progress value={33} className="h-2" />
        </div>
      </div>
      <ResumeEditor />
    </div>
  )
}
