import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { Inter } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { LinkPreview } from "../ui/link-preview";
import { FollowerPointerCard } from "../ui/following-pointer";
// Have to Add Server Side Rendering
interface Author {
  name: string;
  profileImageURL: string;
  username: string;
  id: string;
}

interface Post {
  id: string;
  content: string;
  title: string;
  imageURL: string;
  author: Author;
  createdAt: Date;
  updatedAt: Date;
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
  {
    console.log(data.imageURL);
  }
  const TitleComponent = ({
    title,
    avatar,
  }: {
    title: string;
    avatar: string;
  }) => (
    <div className="flex space-x-2 items-center">
      <Image
        src={avatar}
        height="20"
        width="20"
        alt="thumbnail"
        className="rounded-full border-2 border-white"
      />
      <p>{title}</p>
    </div>
  );
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
