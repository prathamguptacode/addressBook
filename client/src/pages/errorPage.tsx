import { Button } from "@/components/retroui/Button"
import { GhostIcon } from "lucide-react"

function ErrorPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 items-center border-2 border-black p-16 shadow-[6px_6px_0px_black]">
        <GhostIcon size={60} />
        <div className="text-2xl font-bold">Page not found</div>
        <div className="border-2 border-primary w-full"></div>
        <div className="text-center">Something went wrong, please retry later</div>
        <Button>Back to Home</Button>
      </div>
    </div>
  )
}

export default ErrorPage
