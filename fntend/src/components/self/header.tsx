import Link from "next/link";
import { Button } from "../ui/button";
import { GiCottonFlower } from "react-icons/gi";
import { ModeToggle } from "../modif/modetoggle";
import { Input } from "../ui/input";
import { useCurrentUser } from "@/hooks/user";
const Header = () => {
  let user=useCurrentUser();
  return (
    <header className="p-3 text-bg-dark">
      <div className="flex">
        <div className="flex items-center justify-evenly w-2/3">
        <GiCottonFlower />
          
              <Link href="/">
                Hlo
              </Link>
            
              <Link href="/" >
                Home
              </Link>
           
              <Link href="/diary" > 
                MyDiary
              </Link>
           
              <Link href="/post" >
                Post
              </Link>
              <Link href="/contactus">
                ContactUs
              </Link>
              <Link href="/faq">
                  FAQs
              </Link>
              </div>
            <div className="w-72"><Input ></Input></div>
            <ModeToggle></ModeToggle>
          {
            (user)&&(<div className="">
            <Button><Link href="/signin">Login</Link></Button>
            <Button><Link href="/signup">Sign-up</Link></Button>
            </div>)
          }
      </div>
    </header>
  );
};

export default Header;
