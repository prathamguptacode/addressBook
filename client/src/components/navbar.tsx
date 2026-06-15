import mystyle from './navbar.module.css'
import { BookUser, UserRoundPlus } from 'lucide-react'
import { Input } from './retroui/Input'
import { Button } from './retroui/Button'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'

function Navbar() {

  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const { data, refetch } = useQuery({
    queryKey: ["search", query],
    queryFn: () => api.get(`/search?q=${query}`),
    enabled: false
  })
  function reqSearch() {
    if (query) {
      refetch()
    }
  }
  console.log(data)


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
        <Input placeholder='search...' type='text' onChange={e => setQuery(e.currentTarget.value)} />
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
