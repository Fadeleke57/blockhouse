---
sidebar_position: 7
---

# Tanstack (React Query) Hooks

BlockHouse leverages **Tanstack Query** (formerly React Query) to efficiently manage API data fetching, caching, and state management.

## Data Fetching Architecture

The application implements a clean, hooks-based approach to data fetching using React Query. This provides several benefits:
- Automatic caching and background refreshing
- Loading and error states
- Deduplication of requests
- Easy refetching capabilities

### Custom Hook Implementation

The core data fetching logic is encapsulated in a custom hook located in `@/hooks/coins.ts`:

```jsx
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
```

This hook provides:
- A unique query key based on the coin ticker
- A query function that makes the API request
- Configuration options for retry logic and cache invalidation

### Component Integration

Components can easily consume this hook to access cryptocurrency data, loading states, and error handling. Here's how it's used in the `CoinCard` component:

```jsx
const {
  data: coinData,
  isLoading: coinDataLoading,
  isError: coinDataError,
  refetch: coinDataRefetch,
  isFetching: coinDataFetching,
} = useGetCoinData(ticker.toLowerCase());
```

The hook returns:
- `coinData`: The fetched cryptocurrency data
- `coinDataLoading`: Boolean indicating initial loading state
- `coinDataError`: Boolean indicating if an error occurred
- `coinDataRefetch`: Function to manually trigger a refetch
- `coinDataFetching`: Boolean indicating if a background update is in progress

## Key Configuration Options

The React Query setup uses these important configuration options:

- `queryKey`: Unique identifier for this query, allowing React Query to cache and deduplicate requests
- `retry: false`: Disables automatic retrying of failed requests
- `staleTime: 0`: The data is considered stale immediately, allowing for fresh fetches when components remount

## Usage Throughout the Application

Components like `CoinCard` use the loading and error states to render appropriate UI:
- Display skeleton loaders during initial data fetch
- Show error states when API requests fail
- Provide refresh buttons that trigger the `refetch` function
- Maintain a consistent experience with cached data while background updates occur

## Benefits for BlockHouse

This approach provides several advantages:
- Reduced network requests through intelligent caching
- Improved user experience with loading and error states
- Simplified component code by extracting data fetching logic
- Consistent data access patterns across the application