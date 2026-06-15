import mystyle from './navbar.module.css'
import { BookUser, UserRoundPlus, X } from 'lucide-react'
import { Input } from './retroui/Input'
import { Button } from './retroui/Button'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'
import clsx from 'clsx'


type userT = {
  username: string,
  Block: string,
  room: string
}
type resT = {
  users: userT[] | null
}

function Navbar() {

  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const { data, refetch } = useQuery({
    queryKey: ["search", query],
    queryFn: () => api.get<resT>(`/search?q=${query}`),
    enabled: false
  })
  function reqSearch() {
    if (query) {
      refetch()
    }
  }

  useEffect(() => {
    const idT = setTimeout(() => {
      reqSearch()
    }, 300);
    return () => {
      clearTimeout(idT)
    }
  }, [query])


  return (
    <div className={mystyle.navbar}>
      <div className={mystyle.logoBox} >
        <div><BookUser size={32} /></div>
        <div className={mystyle.logo}>Address Book</div>
      </div>
      <div className={mystyle.searchBox}>
        <Input placeholder='search...' type='text' onChange={e => setQuery(e.currentTarget.value)}
          onFocus={() => {
            const elm = document.getElementById("pop")
            if (elm) {
              elm.showPopover()
            }
          }}
        // onBlur={() => {
        //   const elm = document.getElementById("pop")
        //   if (elm) {
        //     elm.hidePopover()
        //   }
        // }}
        />
        {
          query ?
            <button className={mystyle.closeBtn} onClick={() => {
              const elm = document.getElementById("pop")
              if (elm) {
                elm.hidePopover()
              }
            }}><X /></button>
            : null
        }
        <div id="pop" popover='manual' className={clsx(data ? mystyle.pop : null)}>
          {
            data ? data.data.users == null ? <div className='px-[12px]' onClick={() => console.log("cat")}>No user found</div>
              :
              data.data.users.map((e) => {
                return <div className={mystyle.opt} onClick={() => navigate(`/profile?name=${e.username}&block=${e.Block}&room=${e.room}`)}>
                  <div>{e.username}</div>
                  <div className='flex justify-between'>
                    <div>
                      {e.room}
                    </div>
                    <div>
                      {e.Block}
                    </div>
                  </div>
                </div>
              }) : null
          }
        </div>
      </div>
      <div>
        <Button onClick={() => navigate("/form")}>
          <div className={mystyle.btnContent}>
            <div>Add</div> <UserRoundPlus size={17} />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default Navbar
