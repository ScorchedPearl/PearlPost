"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql
  input CreatePostData {
    title: String!
    content: String!
    imageUrl: String
  }
  type Post {
    id: ID!
    title: String!
    content: String!
    imageUrl: String

    author: User!
    
  }
`;
