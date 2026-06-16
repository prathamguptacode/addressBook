import { api } from "@/api/api"
import Navbar from "@/components/navbar"
import { Loader } from "@/components/retroui/Loader"
import RoomBox from "@/components/roomBox"
import SelectBar from "@/components/selectBar"
import type { resRoom } from "@/types/resRoom"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router"

type resT = {
  rooms: resRoom[]
}

function Home() {

  const [block, setBlock] = useState("")
  const { isLoading, data, error } = useQuery({
    queryKey: ['roomData', block],
    queryFn: () => api.get<resT>(`/rooms?q=${block}`)
  })

  const navigate = useNavigate()

  if (error) {
    navigate("/error")
  }


  return (
    <div>
      <Navbar />
      <SelectBar setBlock={setBlock} />
      {
        isLoading ?
          <div className="flex justify-center items-center w-full h-120 ">
            <Loader />
          </div>
          :
          data &&
          <RoomBox rooms={data.data.rooms} />
      }
    </div>
  )
}

export default Home

