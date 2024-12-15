import axios from "axios"
import { prismaClient } from "../../ clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interfaces";
import { User } from "@prisma/client";
import UserSevice from "../../services/userservice";
import { redisClient } from "../../ clients/redis";

const queries={
  verifyGoogleToken: async(parent:any,{token}:{token:string})=>{
    const session= await UserSevice.verifyGoogleAuthToken(token);
    return session;
  },
  getCurrentUser: async(parent:any, args:any, ctx:GraphqlContext)=>{
    const id=ctx.user?.id
    if(!id) return null
    const user= await prismaClient.user.findUnique({ where:{id},include: {
      likes: {
        include: {
          user: true,
        },
      },
    }, })
    console.log(user);
    return user;
  },
  getUserInfoById: async(parent:any,{id}:{id:string})=>{
    if(!id) return null;
    const user= await prismaClient.user.findUnique({where:{id}})
    return user;
  }
}
const PostResolvers={
  User:{
    posts:(parent:User)=>{
      return prismaClient.post.findMany({where:{authorId:parent.id}})
    },
    followers:async (parent:User)=>{
      const result= await prismaClient.follows.findMany(
        { 
          where:{following:{id:parent.id}},
          include:{
            follower:true,
            following:true,
          }
        }
      )
      return result.map(el=>el.follower)
    },
    following:async (parent:User)=>{
      const result= await prismaClient.follows.findMany(
        { 
          where:{follower:{id:parent.id}},
          include:{
            follower:true,
            following:true,
          }
        }
      )
      return result.map(el=>el.following)
    },
    recommendedUsers:async (parent:User,_:any,ctx:GraphqlContext)=>{
      if(!ctx.user||!ctx.user.id) throw new Error("User not authenticated");
      const cachedValue=await redisClient.get(`recommendedUsers:${ctx.user.id}`);
      if(cachedValue) return JSON.parse(cachedValue);
      const myFollowing= await prismaClient.follows.findMany({
        where:
        {follower:
          { id: ctx.user.id }
        },
        include:{
          following:{
            include:{
              followers:{
                include:{
                  following:true
                    }
                  }
                }
              }
        }
      });
      const userToRecommend:User[]=[];
      for(const followings of myFollowing){
        for(const follower of followings.following.followers){
          if(follower.following.id!==ctx.user.id&&myFollowing.findIndex(e=>e.followingid===follower.following.id)<0){
            userToRecommend.push(follower.following);
          }
        }
      }
      const uniqueArray = userToRecommend.filter(
        (item, index, self) =>
          index === self.findIndex(other => other.id === item.id)
      );

      await redisClient.set(`recommendedUsers:${ctx.user.id}`,JSON.stringify(uniqueArray));
      return uniqueArray;
      
    }
  }
}
const mutations={
  followUser:async (parent:any,{to}:{to:string},ctx:GraphqlContext)=>{
    if(!ctx.user||!ctx.user.id) throw new Error("User not authenticated");
    await UserSevice.followUser(ctx.user.id,to);
    await redisClient.del(`recommendedUsers:${ctx.user.id}`);
    return true;

  },
  unfollowUser:async (parent:any,{to}:{to:string},ctx:GraphqlContext)=>{
    if(!ctx.user||!ctx.user.id) throw new Error("User not authenticated");
    await UserSevice.unfollowUser(ctx.user.id,to);
    await redisClient.del(`recommendedUsers:${ctx.user.id}`);
    return true;

  },
  likePost:async (parent:any,{id}:{id:string},ctx:GraphqlContext)=>{
    if(!ctx.user||!ctx.user.id) throw new Error("User not authenticated");
    await UserSevice.likePost(ctx.user.id,id);
    return true;
  },
  unlikePost:async (parent:any,{id}:{id:string},ctx:GraphqlContext)=>{
    if(!ctx.user||!ctx.user.id) throw new Error("User not authenticated");
    
    await UserSevice.UnlikePost(ctx.user.id,id);
    return true;
  }
}
export const resolvers = { queries,PostResolvers,mutations };