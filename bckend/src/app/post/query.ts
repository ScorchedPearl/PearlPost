export const query =`#graphql
  getAllPosts:[Post]
  getPostCount(username:String!):Int
  getPostByUsername(username:String!):[Post]
  getSignedUrlForPostImage(imageName:String!,imageType:String!):String
`