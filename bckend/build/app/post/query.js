"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
exports.query = `#graphql
  getAllPosts:[Post]
  getPostCount(username:String):Int
`;
