import { useSuspenseQuery } from "@tanstack/react-query";
import { USER_DATA_QUERY_KEY } from "../../query/user/userQueryKey";
import { fetchUserData } from "../../query/user/userQueryFns";

export const useGetUserDataQuery = () => {
  const { data, isSuccess } = useSuspenseQuery({
    queryKey: [USER_DATA_QUERY_KEY],
    queryFn: () => fetchUserData(),
  });
  const isLoggedIn = data ? true : false;

  return { data, isSuccess, isLoggedIn };
};
