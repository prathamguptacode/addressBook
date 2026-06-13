import { Button } from "@/components/retroui/Button"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"

function Success() {

  const [query] = useSearchParams()

  const name = query.get("name")
  const block = query.get("block")
  const room = query.get("room")

  const navigate = useNavigate()
  useEffect(() => {
    (() => {
      if (name == null || block == null || room == null) {
        return navigate("/")
      }
    }
    )()
  }, [])

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-140 border-2 w-90 shadow-[6px_6px_0px_black] flex flex-col relative">
        <div className="absolute top-0 border-2 left-0 w-full h-1/2">
          <img src="./profile.webp" className="w-full" />
        </div>
        <div className="profile">{name && name.charAt(0)}</div>
        <div className="flex-1"></div>
        <div className="flex-1 p-3 pt-28 ">
          <div className="profileName text-2xl text-center py-4">{name}</div>
          <div className="text-center text-lg">{block}</div>
          <div className="text-2xl text-center">{room}</div>
          <div className="flex justify-center absolute bottom-8 w-full">
            <Button className="w-60" onClick={() => navigate("/")}><strong>Home</strong></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success
