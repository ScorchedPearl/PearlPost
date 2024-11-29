import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`#graphql
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);
export const getCurrentUserQuery = graphql(`#graphql¸
  query GetCurrentUser {
    getCurrentUser {
    id
    email
    name
    username
    profileImageURL
    posts {
      content
      imageURL
      title
    }
    }
  }
`);
export const getUserInfoByIdQuery = graphql(`#graphql¸
  query GetUserInfoById($getUserInfoByIdId: ID!) {
  getUserInfoById(id: $getUserInfoByIdId) {
    posts {
      content
      imageURL
      title
      id
    }
    email
    id
    name
    username
    profileImageURL
  }
}
`);

