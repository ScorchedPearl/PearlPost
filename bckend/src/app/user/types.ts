export const types=`#graphql
type Like {
    id: ID!         
    createdAt: DateTime     
    userId: String     
    postId: String      
    user: User         
    post: Post         
  }
  type User {
    id:ID!
    name:String!
    username:String
    email:String!
    profileImageURL:String
    likes: [Like]

    followers:[User]
    following:[User]
    posts:[Post]
  }
`