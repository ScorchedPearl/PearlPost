import { ChevronRightIcon } from "@radix-ui/react-icons"
 
import { Button } from "@/components/ui/button"
 
export function ButtonIcon(props:any) {
  return (
    <Button variant="outline" size="icon" onClick={() => props.setShowNotification(true)}>
      <ChevronRightIcon className="h-4 w-4" />
    </Button>
  )
}