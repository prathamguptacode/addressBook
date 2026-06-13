import { Accordion } from "./retroui/Accordion"

function RoomBox() {
  return (
    <div className="py-4 px-4 pt-2">
      <Accordion className="space-y-4 w-full flex gap-4 flex-col " multiple >
        <Accordion.Item value="item-1">
          <Accordion.Header>Accordion Item 1</Accordion.Header>
          <Accordion.Content>
            This is the content of the first accordion item.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2" >
          <Accordion.Header>Accordion Item 2</Accordion.Header>
          <Accordion.Content>
            This is the content of the second accordion item.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Header>Accordion Item 3</Accordion.Header>
          <Accordion.Content>
            This is the content of the third accordion item.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default RoomBox
