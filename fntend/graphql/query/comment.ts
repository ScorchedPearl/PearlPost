import { graphql } from "../../gql";
export const getCommentByPostId = graphql(`#graphql
  query GetCommentByPostId($getCommentByPostIdId: ID!) {
    getCommentByPostId(id: $getCommentByPostIdId) {
        content
        date
        imageUrl
        author {
            username
            name
            profileImageURL
        }
    }
  }
`);