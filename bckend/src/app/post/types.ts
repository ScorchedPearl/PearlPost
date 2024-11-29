import { Diary, Post } from "@prisma/client"


export const types=`#graphql
  # type tag{
  # id: string
  # title:string
  # diaries:Diary[]
  # posts:Post[]
  # }
  input CreatePostData {
    title: String!
    content: String!
    imageUrl: String!
    tags: [String!]!
  }
  scalar DateTime
  type Post {
    id: ID!
    title: String!
    content: String!
    imageURL: String!
    tags: [String!]!
    createdAt: DateTime!
    updatedAt: DateTime
    author: User!
  }
`;