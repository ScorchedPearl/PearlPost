import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { Inter } from "next/font/google"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Author {
  name: string;
  profileImageURL: string;
  username: string;
}

interface Post {
  id: string;
  content: string;
  title: string;
  imageUrl: string;
  author: Author;
}
interface FeedCardProps {
  data: Post
}
const inter=Inter({ subsets:["latin"]});
export default function PostCard(props:FeedCardProps) {
  const {data}=props;
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 ml-10 border border-gray-800 p-3 hover:bg-slate-950 transition-all cursor-pointer border-b-0">
      <div className="col-span-1">
        <Avatar>
            <AvatarImage src={ data.author.profileImageURL? 
              data.author.profileImageURL:"https://avatars.githubusercontent.com/u/184803610?v=4"}/>
            <AvatarFallback>CN</AvatarFallback>
         </Avatar>
        </div>
        <div className="col-span-11">
          <h5 className="relative left-2">{data.author.name}</h5>
          <h6 className="text-gray-700 m-0 p-0 relative bottom-2 left-2 text-sm">@{data.author.username}</h6>
          <h4>{data.title}</h4>
          {data.imageUrl&& <Image
            src={data.imageUrl}
            alt="user-image"
            height={50}
            width={50}
            className="rounded-3xl"
          ></Image>}
          <p>
            {data.content}
          </p>
          <div className="flex justify-between mt-5 text-xl items-center pr-10">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <FaRegHeart />
            </div>
            <div>
            <IoAnalyticsOutline />
            </div>
            <div>
              <LuUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
