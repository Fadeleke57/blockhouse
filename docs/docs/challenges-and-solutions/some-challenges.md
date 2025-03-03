---
sidebar_position: 1
---

# Challenges Faced

Building the cryptocurrency dashboard presented several significant challenges that required creative solutions and careful planning. This document outlines the main obstacles encountered and how they were overcome.

## Caching Strategy for Real-Time Price Data

One of the most significant challenges was designing an effective caching strategy for cryptocurrency price data.

### The Challenge

Cryptocurrency prices fluctuate constantly, making traditional caching approaches problematic:

- Too much caching: Users see outdated prices
- No caching: Excessive API calls and potential performance issues

### Solution

I implemented a tiered caching approach using TanStack Query with custom configurations:

```jsx
export function useGetCoinData(ticker: string) {
  return useQuery({
    queryKey: ["coin", "data", ticker],
    queryFn: async () => {
      const response = await api.get(
        `https://api.coingecko.com/api/v3/coins/${ticker}`
      );
      return response.data;
    },
    // zero stale time ensures fresh data on component mount
    staleTime: 0,
    // cache data for 1 minute to prevent redundant API calls during navigation
    gcTime: 60 * 1000,
    retry: false,
  });
}
```

This approach allowed for:
- Fresh data when users specifically visit a coin page
- Reasonable prevention of redundant API calls
- Manual refresh capabilities for users wanting the latest data

## API Rate Limiting Challenges

CoinGecko's free API tier imposes strict rate limits that complicated development and testing.

### The Challenge

During development, I frequently encountered:
- 429 "Too Many Requests" errors
- Inconsistent API responses
- Difficulty testing the application thoroughly

### Solution

I implemented this countermeasure:

Request batching to minimize API calls for testing:

```jsx
export function useGetMultipleCoins(coins: string[]) {
  return useQuery({
    queryKey: ["coins", "list", coins],
    queryFn: async () => {
      // single API call for multiple coins
      const response = await api.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.join(',')}`
      );
      return response.data;
    },
    retry: 1,
    retryDelay: 5000, // wait 5 seconds before retry
  });
}
```
I only used this hook for testing because in order for the prices to be manually refetched independent of each other, the hook would have to fetch only the neccessary data for that coin.

3. Implementing exponential backoff for failed requests
4. Adding comprehensive error handling UI components

## UI Design for Data Visualization

Designing intuitive card components that effectively display cryptocurrency data proved challenging.

### The Challenge

The design needed to:
- Display complex price data clearly
- Support responsive layouts
- Provide visual cues for price movements
- Maintain accessibility standards

### Solution

I used Figma to prototype several card designs before implementation:

1. Created wireframes for various screen sizes
2. Designed visual indicators for price movements (green/red)
3. Implemented a consistent grid system for the dashboard

The final implementation used styled components with dynamic theming based on price movement:

```jsx
const getChangeColor = (percentage: number) => {
  return percentage >= 0 ? "text-green-500" : "text-red-500";
};

const getChangeIcon = (percentage: number) => {
  return percentage >= 0 ? (
    <ArrowUpRight className="h-4 w-4" />
  ) : (
    <ArrowDownRight className="h-4 w-4" />
  );
};
```

This approach resulted in a clean, intuitive interface that effectively communicated price movements while maintaining visual appeal and usability.
