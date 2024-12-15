export const types=`#graphql
  input CreateCommentData {
    content: String!
    imageUrl: String
    tags: [String!]
    date: String
    postid: ID!
  }
  type Comment {
    id: ID!
    title: String!
    content: String!
    tags: [String!]
    date: String
    imageUrl: String
    public:Boolean
    author: User!
    postid: ID!
  }
`;