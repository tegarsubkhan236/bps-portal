import {useInfiniteQuery} from "@tanstack/react-query";
import {fetchNews} from "../api/fetchNews.ts";

export const useNewsApi = () => {
    const {data, fetchNextPage, hasNextPage, isFetching, isError, isPending} = useInfiniteQuery({
        queryKey: ["newsData"],
        queryFn: async ({pageParam}) => fetchNews(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });

    return {data, fetchNextPage, hasNextPage, isFetching, isError, isPending};
};
