import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
export function InputWithButton() {
  return (
    <div>
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" className="w-80"/>
      <Button type="submit">Search</Button>
    </div>
    </div>
  )
}
