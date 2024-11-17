import { graphql } from "../../gql";



export const getAllPostsQuery = graphql(`
  query GetAllPosts {
    getAllPosts {
      id
      content
      title
      imageUrl
      author {
        name
        profileImageURL
        username
      }
    }
  }
`);
