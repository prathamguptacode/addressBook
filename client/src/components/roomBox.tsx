import type { resRoom } from "@/types/resRoom"
import { Accordion } from "./retroui/Accordion"

function RoomBox({ rooms }: { rooms: resRoom[] }) {


  return (
    <div className="py-4 px-4 pt-2">
      <Accordion className="space-y-4 w-full flex gap-4 flex-col " multiple >
        {
          rooms.map(e => {
            return (
              <Accordion.Item key={e._id} value={e.roomNumber} >
                <Accordion.Header >
                  <div className="w-full flex justify-between items-center pr-4" id={`FLOOR_${e.floor}`} >
                    <div>
                      <strong>
                        {e.roomNumber}
                      </strong>
                    </div>
                    <div>
                      {e.block}
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Content>
                  {
                    e.membersD.map(m => {
                      return <span className="px-1">{m.username}, </span>
                    })
                  }
                </Accordion.Content>
              </Accordion.Item>
            )
          })
        }
      </Accordion>
    </div>
  )
}

export default RoomBox
