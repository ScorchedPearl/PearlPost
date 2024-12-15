"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql
  type Like {
    id: ID!         
    createdAt: DateTime     
    userId: String     
    postId: String      
    user: User         
    post: Post         
  }
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
    likes: [Like]
  }
`;
