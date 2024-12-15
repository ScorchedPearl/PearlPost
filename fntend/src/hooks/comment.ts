import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { graphqlClient } from "../../clients/api"
import { CreateCommentData, GetCommentByPostIdQuery, GetCommentByPostIdQueryVariables } from "gql/graphql";
import { createCommentMutation } from "graphql/mutation/comment";
import { getCommentByPostId } from "graphql/query/comment";
import { usePathname } from "next/navigation";

export const useCreateComment=()=>{
  const queryClient=useQueryClient()
    const pathname = usePathname();
    const lastSegment = pathname?.split('/').pop();
  return useMutation({
    mutationKey: ["create-comment"],
    mutationFn:async(payload:CreateCommentData)=>{
      console.log('Data received in mutationFn:', payload);;
      try {
        return await graphqlClient.request(createCommentMutation as any, {payload});
      } catch (error) {
        console.error('Error in graphqlClient.request:', error);
      }
    },
    onSuccess:()=>
      queryClient.invalidateQueries(["comment-id", lastSegment]as any),
   
  })
}
export const useGetCommentByPostId = (id: string) => {
  const query = useQuery<GetCommentByPostIdQuery, Error>({
    queryKey: ["comment-id", id],
    queryFn: () =>
      graphqlClient.request<GetCommentByPostIdQuery, GetCommentByPostIdQueryVariables>(
        getCommentByPostId as any,
        { getCommentByPostIdId: id }
      ),
  });
  return{...query,comment:query.data?.getCommentByPostId,
    isLoading999:query.isLoading,
  };
}

