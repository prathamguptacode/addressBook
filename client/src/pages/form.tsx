import { api } from "@/api/api"
import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { Select } from "@/components/retroui/Select"
import { useRef, useState } from "react"
import { toast } from "sonner"
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

function Form() {

  const ref = useRef<LoadingBarRef>(null);
  const [block, setBlock] = useState("")
  const [room, setRoom] = useState("")

  async function handleClick() {
    if (block == "") {
      return toast.error("Please select your Block")
    }
    if (room == "") {
      return toast.error("Please enter your Room")
    }
    const res = await api.post(`/verify/${block}/${room}`)
    if (ref.current) {
      ref.current.continuousStart()
    }
    if (res.status == 200) {
      window.location = res.data.url
    }
    else {
      toast.error("Something went wrong")
    }
  }


  return (
    <div className="max-w-6xl h-screen flex justify-center items-center  formBox ">
      <LoadingBar color="#ffdb33" shadow={true} height={4} ref={ref} />
      <div className="flex h-125 border-3 border-black shadow-[6px_6px_0px_black] ">
        <div className="flex-1 p-6 flex flex-col gap-4 relative">
          <div className="flex flex-col gap-1">
            <div className='font-bold text-4xl formTitle'>HELLO WORLD</div>
            <div className='text-xl'>Enter your room details below</div>
          </div>
          <div>
            <div>Full Name</div>
            <Input placeholder="Bill Markus" />
          </div>
          <div>
            <div>Block</div>
            <Select onValueChange={(e) => {
              const block = String(e)
              setBlock(block)
            }}>
              <Select.Trigger className="w-60">
                <Select.Value placeholder="Pick your Block" />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Item value="A_BLOCK">A Block</Select.Item>
                  <Select.Item value="B_BLOCK">B block</Select.Item>
                  <Select.Item value="C_BLOCK">C Block</Select.Item>
                  <Select.Item value="D1_BLOCK">D1 Block</Select.Item>
                  <Select.Item value="D2_BLOCK">D2 Block</Select.Item>
                  <Select.Item value="E_BLOCK">E Block</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select>
          </div>
          <div>
            <div>Room number</div>
            <Input placeholder="1404" type="number" onChange={(e) => setRoom(e.currentTarget.value)} />
          </div>
          <div className="py-4 w-full">
            <Button className="w-full h-12" onClick={handleClick}>Verify with Google</Button>
          </div>
          <div className="text-center absolute bottom-0 left-0 p-2 w-full ">Thank you for filling Address Book</div>
        </div>
        <div className="flex-1  border-2 hidden md:block">
          <img src="./home.webp" />
        </div>
      </div>
    </div>
  )
}

export default Form 
