import { useQuery } from "@tanstack/react-query"
import { graphqlClient } from "../../clients/api";
import { getCurrentUserQuery, getUserInfoByIdQuery } from "../../graphql/query/user"
import { GetCurrentUserQuery } from "gql/graphql";

export const useCurrentUser  = () => {
  const query = useQuery<GetCurrentUserQuery>({
    queryKey: ['current-user'],
    queryFn: () => graphqlClient.request(getCurrentUserQuery as any),
  });
  return {
    ...query,
    user: query.data?.getCurrentUser  || null,
    isLoading: query.isLoading ,
  };
};
export const useCurrentUserById = (getUserInfoByIdId:string) => {
  const query = useQuery({
    queryKey: ['current-user',getUserInfoByIdId],
    queryFn: () => graphqlClient.request(getUserInfoByIdQuery,{getUserInfoByIdId}),
  });
  return {
    ...query,
    userid: query.data?.getUserInfoById  || null,
    isLoading5:query.isLoading,
  };
};