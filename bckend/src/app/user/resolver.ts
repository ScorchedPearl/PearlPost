import axios from "axios"
import { prismaClient } from "../../ clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interfaces";
import { User } from "@prisma/client";
interface GoogleTokenResult {
  email:string;
  email_verified:string;
  given_name:string;
  name:string;
  picture:string;
  sub?:string;
}
const queries={
  verifyGoogleToken: async(parent:any,{token}:{token:String})=>{
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
  },
  getCurrentUser: async(parent:any, args:any, ctx:GraphqlContext)=>{
    const id=ctx.user?.id
    if(!id) return null
    const user= await prismaClient.user.findUnique({ where:{id} })
    console.log(user);
    return user;
  }
}
const PostResolvers={
  User:{
    posts:(parent:User)=>{
      return prismaClient.post.findMany({where:{authorId:parent.id}})
    }
  }
}
export const resolvers = { queries,PostResolvers };