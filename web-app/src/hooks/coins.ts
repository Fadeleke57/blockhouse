import { QueryClient, useQuery } from "@tanstack/react-query";
import api from "../lib/apiClient";

export function useGetCoinData(ticker: string) {
  return useQuery({
    queryKey: ["coin", "data", ticker],
    queryFn: async () => {
      const response = await api.get(
        `https://api.coingecko.com/api/v3/coins/${ticker}`
      );
      return response.data;
    },
    retry: false,
    staleTime: 0,
  });
}
