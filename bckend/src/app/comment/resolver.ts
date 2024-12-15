import { prismaClient } from "../../ clients/db";
import { GraphqlContext } from "../../interfaces";



interface CreateCommentData {
  title: string
  content: string
  imageUrl?: string
  tags?: string[]
  date?: Date
  public?:boolean
  postid: string
}
const mutations = {
  createComment: async (
    parent: any,
    { payload }: { payload: CreateCommentData },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) {
      throw new Error("You must be logged in to create a post");
    }
    const date = payload.date ? new Date(payload.date) : new Date();

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

    const comment = await prismaClient.comment.create({
      data: {
        content: payload.content,
        imageUrl: payload.imageUrl,
        date: date,
        public: payload.public,
        tags: {
          connect: tagConnections,
        },
        author: {
          connect: { id: ctx.user.id },
        },
        post:{
          connect: { id: payload.postid }
        },
      },
    });

    return comment;
  },
};

const queries={
  getCommentByPostId: async(
    parent:any,
    {id}:{id:string},
    ctx:GraphqlContext
  )=>{
    if (!ctx.user) {
      throw new Error("You must be logged in to create a post");
    }
    const comment=await prismaClient.comment.findMany({
      where:{
        postId: id
      },
      include: { author: true }
    })
    return comment;
  }
}
export const resolvers={mutations,queries}