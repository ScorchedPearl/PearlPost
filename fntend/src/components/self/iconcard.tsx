import { Inter } from "next/font/google"
import { BsFillPostcardFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
const inter=Inter({ subsets:["latin"]});

export default function IconCard(props:any) {
  const items=[
    {
      title:"Total Posts",
      icon:<BsFillPostcardFill/>,
      count:props.PostCount
    },{
      title:"Total Comments",
      icon:<FaComments />

    },{
      title:"Total Likes",
      icon:<FcLike />,
      count:props.LikeCount
    },{
      title:"Total Follower",
      icon:<CgProfile />,
      count:props.FollowerCount
    }
  ]
  return ( 
    <div className="flex flex-row gap-4">
        {items.map((item)=>{
          return(
          <div className="h-24 w-64 bg-gradient-to-r from-[#1a2029] to-[#0f172a] rounded-lg flex flex-col justify-center mx-4 pl-3"><div className="flex items-end justify-between h-1/4 w-full" key={item.title}>
            <h2 className="text-white text-xl">{item.title}</h2>
            <div className="h-full w-10">{item.icon}</div>
            </div>
            <div className="float-left">
              {item.count}
          </div>
          </div>
          )
        })}
      </div>
  );
}
