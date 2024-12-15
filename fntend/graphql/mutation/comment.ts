import { graphql } from "../../gql";

export const createCommentMutation=graphql(`#graphql
  mutation CreateComment($payload: CreateCommentData!) {
    createComment(payload: $payload) {
      id
    }
}
`);