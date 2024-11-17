import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { graphqlClient } from "clients/api"
import { CreatePostData } from "gql/graphql";
import { createPostMutation } from "graphql/mutation/post";
import { getAllPostsQuery } from "graphql/query/post";
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