export const mutations=`#graphql
  followUser(to:ID!):Boolean
  unfollowUser(to:ID!):Boolean
  likePost(id:ID!):Boolean
  unlikePost(id:ID!):Boolean
`