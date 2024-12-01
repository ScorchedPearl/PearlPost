"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql
  type User {
    id:ID!
    name:String!
    username:String
    email:String!
    profileImageURL:String

    followers:[User]
    following:[User]
    posts:[Post]
  }
`;
