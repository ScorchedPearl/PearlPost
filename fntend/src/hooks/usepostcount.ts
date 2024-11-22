import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from 'clients/api';
import { getPostCountQuery } from 'graphql/query/post';

interface GetPostCountResponse {
  getPostCount: number;
}

interface GetPostCountVariables {
  username: string;
}

export const usePostCount = (username:string) => {
  let query=useQuery<GetPostCountResponse, Error>({
    queryKey:["all-posts"],
    queryFn:()=>graphqlClient.request<GetPostCountResponse, GetPostCountVariables>(getPostCountQuery, {
        username
      }),
    }
  );

  return { ...query, posts: query.data?.getPostCount };
};

export default usePostCount;