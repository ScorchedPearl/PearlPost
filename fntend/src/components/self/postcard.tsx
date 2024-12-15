import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { Inter } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { LinkPreview } from "../ui/link-preview";
import { graphqlClient } from "clients/api";
import { likePostMutation, unlikePostMutation } from "graphql/mutation/user";
import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/user";
import { FcLike } from "react-icons/fc";
// Have to Add Server Side Rendering
interface Author {
  name: string;
  profileImageURL: string;
  username: string;
  id?: string;
}
interface Like{
  id:string;
  createdAt:Date;
  userId:string;
  postId:string;
}
interface Post {
  id: string;
  content: string;
  title: string;
  imageURL?: string;
  author: Author;
  createdAt: Date;
  updatedAt: Date;
  likes?:[Like]
}
interface FeedCardProps {
  data: Post;
}
const inter = Inter({ subsets: ["latin"] });

export default function PostCard(props: FeedCardProps) {
  const { data } = props;
  const isoString = data.createdAt;
  const date = new Date(isoString);
  const datePart = date.toISOString().split("T")[0];
  const timePart = date.toISOString().split("T")[1].split(".")[0];
  const linkToPf = `http://localhost:3000/post/profile/${data.author.id}`;
  const {user} =useCurrentUser();
  const amiLiked = useMemo(() => {
    if (!data || !user?.id) {
      return false;
    }
    return data.likes?.some(liker => liker.userId === user.id);
  }, [user?.id, data]);
  const queryClient=useQueryClient();
  const handleLikePost=useCallback(async()=>{
    console.log("CLicked");
    if(!data?.id) return;
    else{
      await graphqlClient.request(likePostMutation as any,{likePostId:data.id})
      await queryClient.invalidateQueries(["current-user",data?.id]as any)
    }
  },[queryClient,data?.id])
  const handleUnlikePost=useCallback(async()=>{
    console.log("CLicked");
    if(!data?.id) return;
    else{
      await graphqlClient.request(unlikePostMutation as any,{unlikePostId:data.id})
      await queryClient.invalidateQueries(["current-user",data?.id]as any)
    }
  },[queryClient,data?.id])
  return (
    <div className={inter.className}>
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          <div className="">
            <div className="grid grid-cols-12 ml-10 border border-gray-800 p-3 hover:bg-slate-950 transition-all cursor-pointer border-b-0 pr-9">
              <div className="col-span-1">
                <Avatar>
                  <AvatarImage
                    src={
                      data.author.profileImageURL
                        ? data.author.profileImageURL
                        : "https://avatars.githubusercontent.com/u/184803610?v=4"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="col-span-11">
                <div className="flex justify-between">
                  <h5 className="relative left-2">
                    <LinkPreview url={linkToPf} className="font-bold">
                    <Link href={linkToPf}>{data.author.name}</Link>
                    </LinkPreview>
                  </h5>{" "}
                  <h5 className="text-sm text-gray-500">
                    {datePart} {timePart}
                  </h5>
                </div>

                <h6 className="text-gray-700 m-0 p-0 relative bottom-2 left-2 text-sm">
                  @{data.author.username}
                </h6>

                <p className={"text-xl mb-4"}>{data.title}</p>

                <div className="text-sm  prose prose-sm dark:prose-invert">
                  {data?.imageURL && (
                    <Image
                      src={data.imageURL}
                      alt="blog thumbnail"
                      height="1000"
                      width="1000"
                      className="rounded-lg mb-10 object-cover"
                    />
                  )}
                  {data.content}
                </div>
                <div className="flex justify-between mt-5 text-xl items-center pr-10">
                  <Link href={`http://localhost:3000/post/searchpost/${data.id}`}>
                  <div>
                    <BiMessageRounded />
                  </div>
                  </Link>
                  { amiLiked?<button onClick={handleUnlikePost}>
                  <FcLike />
                  <div>{data.likes?.length}</div>
                  </button>:<button onClick={handleLikePost}>
                    <FaRegHeart />
                    <div>{data.likes?.length}</div>
                  </button>
                    }
                  <button>
                    <IoAnalyticsOutline />
                  </button> 
                  <div>
                    <LuUpload />
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
// export function ServerSideRenderProps():GetServerSideProps{
//   return <>

//   </>
// }

{
  /* export default function PostCard(props:FeedCardProps) {
  const {data}=props;
  const isoString = data.createdAt;
  const date = new Date(isoString);
  const datePart = date.toISOString().split('T')[0];
  const timePart = date.toISOString().split('T')[1].split('.')[0]; 
  const linkToPf=`http://localhost:3000/post/profile/${data.author.id}`
  {console.log(data.imageURL)}
  return (
    <div className={inter.className}>
      
          <h4 className="text-4xl font-bold text-gray-900 dark:text-white">{data.title}</h4>
          
           {data.imageURL&& <Image
            src={data.imageURL}
            alt="user-image"
            height={400}
            width={600}
            className="rounded-3xl"
          ></Image>}
          <p>
            {data.content}
          </p>
          <div></div>
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
} */
}
