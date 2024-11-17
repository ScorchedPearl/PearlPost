export const types=`#graphql
  input CreatePostData {
    title: String!
    content: String!
    imageUrl: String
  }
  type Post {
    id: ID!
    title: String!
    content: String!
    imageUrl: String

    author: User!
    
  }
`;