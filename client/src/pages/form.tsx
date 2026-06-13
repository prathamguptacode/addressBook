import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { Select } from "@/components/retroui/Select"

function Form() {
  return (
    <div className="max-w-6xl h-screen flex justify-center items-center  formBox ">
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
            <div>Building</div>
            <Select>
              <Select.Trigger className="w-60">
                <Select.Value placeholder="Pick your Pokemon" />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Item value="pikachu">Pikachu</Select.Item>
                  <Select.Item value="charizard">Charizard</Select.Item>
                  <Select.Item value="bulbasaur">Bulbasaur</Select.Item>
                  <Select.Item value="squirtle">Squirtle</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select>
          </div>
          <div>
            <div>Room number</div>
            <Input placeholder="1404" />
          </div>
          <div className="py-4 w-full ">
            <Button className="w-full h-12">Verify with Google</Button>
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
