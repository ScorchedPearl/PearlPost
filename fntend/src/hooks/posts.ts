import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { graphqlClient } from "../../clients/api"
import { CreatePostData, User } from "gql/graphql";
import { createPostMutation } from "graphql/mutation/post";
import { getAllPostsQuery, getPostByUsernameQuery } from "graphql/query/post";
import { getPostCountQuery } from 'graphql/query/post';
import { useEffect } from "react";
interface Author {
  name: string;
  profileImageURL: string;
  username: string;
}
export type GetPostByUsernameQuery = {
  getPostByUsername: {
    id: string;
    content: string;
    title: string;
    imageUrl: string;
    tags: string[];
    like:User[];
    author: {
      name: string;
      profileImageURL: string;
    };
  }[];
};

export type GetPostByUsernameVariables = {
  username: string;
};

interface Post {
  id: string;
  content: string;
  title: string;
  tags: string[];
  imageUrl: string;
  createdAt:Date;
  updatedAt:Date;
  author: Author;
  Like: User[];
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
  return{ ...query,posts:query.data?.getAllPosts,
    isLoading2: query.isLoading,
  };
}
export const useGetPostsByUsername = (username: string) => {
  const query = useQuery<GetPostByUsernameQuery, Error>({
    queryKey: ["post-username", username],
    queryFn: () =>
      graphqlClient.request<GetPostByUsernameQuery, GetPostByUsernameVariables>(
        getPostByUsernameQuery,
        { username }
      ),
  });
  return{...query,post:query.data?.getPostByUsername,
    isLoading4:query.isLoading,
  };
}

export const usePostCount = (username: string) => {
  const query = useQuery<GetPostCountResponse, Error>({
    queryKey: ["post-count", username],
    queryFn: () =>
      graphqlClient.request<GetPostCountResponse, GetPostCountVariables>(
        getPostCountQuery,
        { username }
      ),
  });
  return { ...query, postCount:query.data?.getPostCount,
    isLoading3: query.isLoading,
   };
};
