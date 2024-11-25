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
export const getPostCountQuery = graphql(`
  query GetPostCount($username: String!) {
  getPostCount(username: $username)
}
`);
export const getPostByUsernameQuery = graphql(`
   query GetPostByUsername($username: String) {
    getPostByUsername(username: $username) {
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