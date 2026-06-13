import { Button } from "@/components/retroui/Button"

function Success() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-140 border-2 w-90 shadow-[6px_6px_0px_black] flex flex-col relative">
        <div className="absolute top-0 border-2 left-0 w-full h-1/2">
          <img src="./profile.webp" className="w-full" />
        </div>
        <div className="profile">PG</div>
        <div className="flex-1"></div>
        <div className="flex-1 p-3 pt-28 ">
          <div className="profileName text-2xl text-center py-4">Pratham Gupta</div>
          <div className="text-center text-lg">A Block</div>
          <div className="text-2xl text-center">1404</div>
          <div className="flex justify-center absolute bottom-8 w-full">
            <Button className="w-60"><strong>Home</strong></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success
