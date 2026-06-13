import { Select } from "./retroui/Select"

function SelectBar() {
  return (
    <div className="flex gap-4 px-5 py-5">
      <Select>
        <Select.Trigger className="w-30">
          <Select.Value placeholder="Building" />
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
      <Select>
        <Select.Trigger className="w-30">
          <Select.Value placeholder="Floor" />
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
  )
}

export default SelectBar
