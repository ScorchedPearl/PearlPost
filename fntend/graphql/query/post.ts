import { TypedQueryDocumentNode } from "graphql";
import { graphql } from "../../gql";

interface GetPostCountResponse {
  getPostCount: number;
}
interface GetPostCountVariables {
  username: string;
}
export type GetPostByUsernameQuery = {
  getPostByUsername: {
    id: string;
    content: string;
    title: string;
    imageUrl: string;
    author: {
      name: string;
      profileImageURL: string;
      username: string;
    };
  }[];
};

export type GetPostByUsernameVariables = {
  username: string;
};
export const getAllPostsQuery = graphql(`#graphql
  query GetAllPosts {
    getAllPosts {
      id
      content
      title
      imageUrl
      author {
        name
        profileImageURL
        username
      }
    }
  }
`);
export const getPostCountQuery = graphql(`#graphql
  query GetPostCount($username: String!) {
    getPostCount(username: $username)
  }
`) as TypedQueryDocumentNode<GetPostCountResponse, GetPostCountVariables>;

export const getPostByUsernameQuery = graphql(`#graphql
  query GetPostsByUsername($username: String!) {
    getPostByUsername(username: $username) {
      id
      content
      title
      imageUrl
      author {
        name
        profileImageURL
        username
      }
    }
  }
`)as TypedQueryDocumentNode<GetPostByUsernameQuery, GetPostByUsernameVariables>;;
