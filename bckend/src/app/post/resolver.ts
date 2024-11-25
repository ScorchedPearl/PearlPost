import { Post } from "@prisma/client";
import { prismaClient } from "../../ clients/db";
import { GraphqlContext } from "../../interfaces";
interface CreatePostPayload{
  title: string
  content: string
  imageUrl?: string
}
const queries={
  getAllPosts:()=>prismaClient.post.findMany({orderBy:{createdAt:"desc"}}),
  getPostCount: async (parent:any,args:any,context:any,info:any) => {
    const { username } = args;
    if(username==="lol"){
      return 0;
    }
    return await prismaClient.post.count({ where: { author: { username } } });
  },
  getPostByUsername:async (parent:any,{username}:{username:string})=>{
    if(username==="lol"){
      return [];
    }
    const post=await prismaClient.post.findMany({
      where:{
        author:{
          username
        }
      }
    })
    return post;
  }
}
const mutations={
  createPost:async (parent:any,{payload}:{payload:CreatePostPayload},ctx:GraphqlContext)=>{
    if(!ctx.user){
      throw new Error("You must be logged in to create a post")
    }
    console.log('Received payload:', payload);
    const post=await prismaClient.post.create({
      data:{
        title:payload.title,
        content:payload.content,
        imageURL:payload.imageUrl,
        author:{
          connect:{
            id:ctx.user.id
          }
        }
      }
    })
    return post;
  },
};
const authorResolvers={
  Post:{
    author:(parent:Post)=>{
      return prismaClient.user.findUnique({
        where:{
          id:parent.authorId
        }
      })
    }
  }
}
export const resolvers={mutations,authorResolvers,queries};