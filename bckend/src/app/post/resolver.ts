import { Post } from "@prisma/client";
import { prismaClient } from "../../ clients/db";
import { GraphqlContext } from "../../interfaces";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
interface CreatePostPayload{
  title: string
  content: string
  imageUrl: string
  tags: string[]
}
const s3Client= new S3Client({
  region:process.env.AWS_REGION,
})
const queries={
  getAllPosts:()=>prismaClient.post.findMany({orderBy:{createdAt:"desc"}}),
  getPostCount: async (parent:any,{username}:{username:string},context:any,info:any) => {
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
    return  post ;
  },
  getSignedUrlForPostImage:async (parent:any,{imageType,imageName}:{imageType:string,imageName:string},ctx:GraphqlContext)=>{
    if(!ctx.user||!ctx.user.id){
      throw new Error("You must be logged in to create a post")
    }
    const allowedImagetype=["image/jpg","image/jpeg","image/png","image/webp"];
    if(!allowedImagetype.includes(imageType)){
      throw new Error("Invalid image type")
    }
    const putObjectCommand= new PutObjectCommand({
      Bucket:process.env.AWS_S3_BUCKET_NAME,
      Key:`upload/${ctx.user.id}/post/${imageName}-${Date.now()}.${imageType}}`,
    });
    const signedURL=await getSignedUrl(s3Client,putObjectCommand);
    return signedURL;
  }

}
const mutations={
  createPost:async (parent:any,{payload}:{payload:CreatePostPayload},ctx:GraphqlContext)=>{
    if(!ctx.user){
      throw new Error("You must be logged in to create a post")
    }
    console.log('Received payload:', payload);
    const tags = payload.tags ? payload.tags.map((tag: string) => tag.trim()) : [];

    const tagConnections = await Promise.all(
      tags.map(async (tag) => {
        let existingTag = await prismaClient.tag.findUnique({
          where: { title: tag },
        });

        if (!existingTag) {
          existingTag = await prismaClient.tag.create({
            data: { title: tag },
          });
        }

        return { id: existingTag.id };
      })
    );
    const post=await prismaClient.post.create({
      data:{
        title:payload.title,
        content:payload.content,
        imageURL:payload.imageUrl,
        tags:{
          connect:tagConnections,
        },
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