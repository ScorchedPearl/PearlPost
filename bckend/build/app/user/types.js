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
  type User {
    id:ID!
    name:String!
    username:String
    email:String!
    profileImageURL:String
    likes: [Like]

    followers:[User]
    following:[User]
    posts:[Post]
  }
`;
