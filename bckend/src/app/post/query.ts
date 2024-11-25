export const query =`#graphql
  getAllPosts:[Post]
  getPostCount(id:String):Int
  getPostByUsername(id:String):[Post]
`