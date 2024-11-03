import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { Inter } from "next/font/google"

const inter=Inter({ subsets:["latin"]});
export default function PostCard() {
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 ml-10 border border-gray-800 p-3 hover:bg-slate-950 transition-all cursor-pointer border-b-0">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/184803610?v=4"
            alt="user-image"
            height={50}
            width={50}
            className="rounded-3xl"
          ></Image>
        </div>
        <div className="col-span-11">
          <h5>Vishwas</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            inventore quam omnis ex iusto tenetur sed sint quidem, dolorem id!
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
