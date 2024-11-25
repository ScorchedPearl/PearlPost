export const types=`#graphql
  input CreateDiaryData {
    title: String!
    content: String!
    imageUrl: String
    tags: [String!]
    date: String
  }
  type Diary {
    id: ID!
    title: String!
    content: String!
    tags: [String!]
    date: String
    imageUrl: String
    public:Boolean
    author: User!
  }
`;