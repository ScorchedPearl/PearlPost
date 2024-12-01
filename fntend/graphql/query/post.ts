import { TypedQueryDocumentNode } from "graphql";
import { graphql } from "../../gql";
import { GetAllPostsQuery } from "../../gql/graphql";

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
      imageURL
      createdAt
      updatedAt
      author {
        name
        profileImageURL
        username
        id
      }
    }
  }
`) as GetAllPostsQuery;
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
      imageURL
      author {
        name
        profileImageURL
      }
    }
  }
`)as TypedQueryDocumentNode<GetPostByUsernameQuery, GetPostByUsernameVariables>;

export const getSignedUrlForPostImageQuery = graphql(`#graphql
  query GetSignedURL($imageName: String!, $imageType: String!) {
  getSignedUrlForPostImage(imageName: $imageName, imageType: $imageType)
}
`);
