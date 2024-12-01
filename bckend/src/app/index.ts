import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from "../ clients/db";
import { User } from "./user";
import { Post } from "./post"
import { GraphqlContext } from "../interfaces";
import JWTService from "../services/jwt";
import { Diary } from "./diary";
export async function initServer(){
  const app=express();
  app.use(bodyParser.json());
  app.use(cors());
  const server = new ApolloServer<GraphqlContext>({
    typeDefs:`
      ${User.types}
      ${Post.types}
      ${Diary.types}
    
      type Query{
          ${User.query}
          ${Post.query}
      }
      type Mutation{
          ${Post.mutations}
          ${Diary.mutations}
          ${User.mutations}
      }
    `,
    resolvers:{
      Query:{
        ...User.resolvers.queries,
        ...Post.resolvers.queries,
      },
      Mutation:{
        ...Post.resolvers.mutations,
        ...Diary.resolvers.mutations,
        ...User.resolvers.mutations,
      },
      ...Post.resolvers.authorResolvers,
      ...User.resolvers.PostResolvers,
    },
  });
  await server.start();
  app.use("/graphql",expressMiddleware(server,{ context : async({req,res})=> {
    return {
      user:req.headers.authorization? await JWTService.decodeToken(req.headers.authorization.split('Bearer ')[1]):undefined
    }
  }}))
  return app;
}
