import { graphql } from "../../gql";

export const followUserMutation= graphql(`#graphql
  mutation FollowUser($to: ID!) {
    followUser(to: $to)
  }
`);
export const unfollowUserMutation= graphql(`#graphql
  mutation UnfollowUser($to: ID!) {
  unfollowUser(to: $to)
}
`);
export const likePostMutation= graphql(`#graphql
  mutation LikePost($likePostId: ID!) {
    likePost(id: $likePostId)
  }
`);
export const unlikePostMutation= graphql(`#graphql
  mutation UnlikePost($unlikePostId: ID!) {
    unlikePost(id: $unlikePostId)
  }
`);