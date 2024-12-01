import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
const names=[
  'Saumya',
  'Varuna',
  'Vishwas',
  'Tanish'
]
export function InputWithButton() {
  const [users,setUsers]=useState(names);
  function shuffleArray(array:string[]) {
    return array.slice().sort(() => Math.random() - 0.5);
  }
  const handleSearch = (event:any) => {
    const text = event.target.value.toLowerCase();
    const filtered = names.filter((user) =>
      user.toLowerCase().includes(text)
    );
    setUsers(filtered);
  };
  return (
    <div>
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" onChange={handleSearch}/>
      <Button onClick={()=>setUsers(shuffleArray(names))} type="submit">Shuffle</Button>
    </div>
    <div>
      <ul>
      {users.map((user)=>(
        <li key={user}>{user}</li>
      ))}
    </ul>
    </div>
    </div>
  )
}
