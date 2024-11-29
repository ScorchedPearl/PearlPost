export const query=`#graphql
  verifyGoogleToken(token:String!): String
  getCurrentUser:User
  getUserInfoById(id:ID!):User
`