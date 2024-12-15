import axios from "axios";
import { prismaClient } from "../ clients/db";
import JWTService from "./jwt";

interface GoogleTokenResult {
  email:string;
  email_verified:string;
  given_name:string;
  name:string;
  picture:string;
  sub?:string;
}
class UserSevice{
  public static async verifyGoogleAuthToken(token:string){
    const googletoken=token;
    const googleoauthurl=new URL('https://www.googleapis.com/oauth2/v3/userinfo')
    const {data}=await axios.get<GoogleTokenResult>
    (googleoauthurl.toString(), {
      headers: {
        Authorization: `Bearer ${googletoken}`,
      },
      responseType:"json"
    });
      const user= await prismaClient.user.findUnique({
        where:{email:data.email},
      });
      if(!user){
        await prismaClient.user.create({
          data:{
            email:data.email,
            username:data.name,
            name:data.given_name,
            profileImageURL:data.picture,
          },
        });
      }
      const userInDb=await prismaClient.user.findUnique({
        where:{email:data.email},
      })
      if(!userInDb) throw Error("User.email not found")
      const session=await JWTService.generateTokenForUser(userInDb);
      return session;
  }
  public static followUser(from: string,to :string){
    return prismaClient.follows.create({
      data:{
        follower:{connect:{id:from}},
        following:{connect:{id:to}},
      }
    })
  }
  public static unfollowUser(from: string,to :string){
    return prismaClient.follows.delete({
      where:{
        followerid_followingid:{
          followerid:from,
          followingid:to,
        }
      }
    })
  }
  public static likePost(user:string,post:string){
    return prismaClient.like.create({
      data:{
        user:{connect:{id:user}},
        post:{connect:{id:post}},
      }
    })
  }
  public static UnlikePost(user:string,post:string){
    return prismaClient.like.delete({
      where:{
        unique_user_post_like:{
          userId:user,
          postId:post,
        }
      }
    })
  }
}
export default UserSevice;