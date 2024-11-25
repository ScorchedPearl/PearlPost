import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { graphqlClient } from "clients/api"
import { CreatePostData, GetPostByUsernameQuery } from "gql/graphql";
import { createPostMutation } from "graphql/mutation/post";
import { getAllPostsQuery, getPostByUsernameQuery } from "graphql/query/post";
import { getPostCountQuery } from 'graphql/query/post';
interface Author {
  name: string;
  profileImageURL: string;
  username: string;
}

interface Post {
  id: string;
  content: string;
  title: string;
  imageUrl: string;
  author: Author;
}
interface GetAllPostsResponse {
  getAllPosts: Post[];
}

interface GetPostCountResponse {
  getPostCount: number;
}

interface GetPostCountVariables {
  username: string;
}
interface GetPostByUsernameResponse{
  getPostUsername: Post[];
}
export const useCreatePost=()=>{
  const queryClient=useQueryClient()
  return useMutation({
    mutationKey: ["create-post"],
    mutationFn:async(payload:CreatePostData)=>{
      console.log('Data received in mutationFn:', payload);;
      try {
        return await graphqlClient.request(createPostMutation as any, {payload});
      } catch (error) {
        console.error('Error in graphqlClient.request:', error);
      }
    },
    onSuccess:()=>
      queryClient.invalidateQueries(["all-posts"]as any),
   
  })
}
export const useGetPosts=()=>{
  const query=useQuery<GetAllPostsResponse>({
    queryKey:["all-posts"],
    queryFn:()=>graphqlClient.request(getAllPostsQuery as any),
})
  return{ ...query,posts:query.data?.getAllPosts};
}
export const useGetPostsByUsername=(username:string)=>{ 
  const query=useQuery<GetPostByUsernameQuery>({
    queryKey:["post-username"],
    queryFn:()=>graphqlClient.request(getPostByUsernameQuery as any, {
        username
      }),
    }
  )
  console.log(query.data);
  return { ...query,post:query.data?.getPostByUsername};
}


export const usePostCount = (username:string) => {
  let query=useQuery<GetPostCountResponse, Error>({
    queryKey:["post-count"],
    queryFn:()=>graphqlClient.request<GetPostCountResponse, GetPostCountVariables>(getPostCountQuery as any, {
        username
      }),
    }
  );

  return { ...query, postCount:query.data?.getPostCount };
};
