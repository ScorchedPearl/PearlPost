export const types=`#graphql
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
`