import mystyle from './navbar.module.css'
import { BookUser, UserRoundPlus } from 'lucide-react'
import { Input } from './retroui/Input'
import { Button } from './retroui/Button'

function navbar() {
  return (
    <div className={mystyle.navbar}>
      <div className={mystyle.logoBox} >
        <div><BookUser size={32} /></div>
        <div className={mystyle.logo}>Address Book</div>
      </div>
      <div className={mystyle.searchBox}>
        <Input placeholder='search...' type='text' />
      </div>
      <div>
        <Button>
          <div className={mystyle.btnContent}>
            <div>Add</div> <UserRoundPlus size={17} />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default navbar
