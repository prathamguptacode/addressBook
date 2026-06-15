import { Select } from "./retroui/Select"

function SelectBar({ setBlock }: { setBlock: React.Dispatch<React.SetStateAction<string>> }) {



  return (
    <div className="flex gap-4 px-5 py-5">
      <Select onValueChange={setBlock}>
        <Select.Trigger className="w-30">
          <Select.Value placeholder="Block" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Item value="A_BLOCK">A BLOCK</Select.Item>
            <Select.Item value="B_BLOCK">B BLOCK</Select.Item>
            <Select.Item value="C_BLOCK">C BLOCK</Select.Item>
            <Select.Item value="D1_BLOCK">D1 BLOCK</Select.Item>
            <Select.Item value="D2_BLOCK">D2 BLOCK</Select.Item>
            <Select.Item value="E_BLOCK">E BLOCK</Select.Item>
            <Select.Item value="">ALL</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>
      <Select onValueChange={(e) => {
        const id = String(e)
        if (id) {
          const elm = document.getElementById(id)
          if (elm) {
            elm.scrollIntoView({
              behavior: "smooth",
              block: "start"
            })
          }
        }
      }
      }>
        <Select.Trigger className="w-30">
          <Select.Value placeholder="Floor" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Item value="">All</Select.Item>
            <Select.Item value="FLOOR_1">FLOOR 1</Select.Item>
            <Select.Item value="FLOOR_2">FLOOR 2</Select.Item>
            <Select.Item value="FLOOR_3">FLOOR 3</Select.Item>
            <Select.Item value="FLOOR_4">FLOOR 4</Select.Item>
            <Select.Item value="FLOOR_5">FLOOR 5</Select.Item>
            <Select.Item value="FLOOR_6">FLOOR 6</Select.Item>
            <Select.Item value="FLOOR_7">FLOOR 7</Select.Item>
            <Select.Item value="FLOOR_8">FLOOR 8</Select.Item>
            <Select.Item value="FLOOR_9">FLOOR 9</Select.Item>
            <Select.Item value="FLOOR_10">FLOOR 10</Select.Item>
            <Select.Item value="FLOOR_11">FLOOR 11</Select.Item>
            <Select.Item value="FLOOR_12">FLOOR 12</Select.Item>
            <Select.Item value="FLOOR_13">FLOOR 13</Select.Item>
            <Select.Item value="FLOOR_14">FLOOR 14</Select.Item>
            <Select.Item value="FLOOR_15">FLOOR 15</Select.Item>
            <Select.Item value="FLOOR_16">FLOOR 16</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>

    </div>
  )
}

export default SelectBar
