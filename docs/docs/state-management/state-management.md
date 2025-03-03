# Why TanStack (React Query)?

In developing this cryptocurrency dashboard, state management was a critical choice. I selected TanStack Query (formerly React Query) for specific reasons that align with the project requirements.

## Simplifying API Data Management

For our cryptocurrency dashboard that displays live prices from CoinGecko, TanStack Query provides elegant solutions:

```
npm install @tanstack/react-query
```

## Key Benefits for Our Project

### 1. Built-in Loading States

TanStack Query automatically tracks loading states, making it trivial to implement the required loading indicator:

```jsx
const {
  data: coinData,
  isLoading: coinDataLoading,
  isError: coinDataError,
  refetch: coinDataRefetch,
  isFetching: coinDataFetching,
} = useGetCoinData(ticker.toLowerCase());

// How it's used
<Card className="w-full cursor-pointer shadow border-l-0 border-t-0 border-r-0 border-b-0 hover:border-r-10 hover:border-b-10 hover:border-blue-500 hover:shadow-md transition-all ease-in-out duration-300 relative">
  {!coinDataLoading && (
    <Button
      size={"icon"}
      variant={"ghost"}
      className="absolute bottom-2 right-2 cursor-pointer text-muted-foreground"
      onClick={handleRefresh}
    >
      <RefreshCcw
        size={16}
        className={coinDataFetching ? "animate-spin" : ""}
      />
    </Button>
  )}
  {coinDataLoading ? (
    <>
      <CardHeader className="pb-2">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-16 w-full mb-4" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </>
  ) ...
```

### 2. Manual Refetching Capability

The "Refresh" button requirement is easily satisfied using TanStack's refetch capabilities:

```jsx
  const {
    data: coinData,
    isLoading: coinDataLoading,
    isError: coinDataError,
    refetch: coinDataRefetch,
    isFetching: coinDataFetching,
  } = useGetCoinData(ticker.toLowerCase());
...

// function to handle refetching
const handleRefresh = async () => {
  console.log("Coin data refetched");
  await coinDataRefetch();

  setIsDialogOpen(false);
};
...
//button implentation
<Button
  size={"icon"}
  variant={"ghost"}
  className="absolute bottom-2 right-2 cursor-pointer text-muted-foreground"
  onClick={handleRefresh}
>
  <RefreshCcw
    size={16}
    className={coinDataFetching ? "animate-spin" : ""}
  />
</Button>
```

### 3. Automatic Caching and Stale-Time Management

Our implementation uses specific configuration for cryptocurrency data, which needs to be fresh:

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
    retry: false,
    staleTime: 0,
  });
}
```

Setting `staleTime: 0` ensures we always fetch fresh data when components mount, appropriate for rapidly changing cryptocurrency prices.

## Advantages Over Alternatives

### Compared to Context API
While Context API is a solid choice for shared state, it lacks built-in data fetching, caching, and stale-time management that our price dashboard requires.

### Compared to Zustand
Zustand is excellent for global state, but TanStack Query's specific focus on server state management provides better abstractions for our data-intensive cryptocurrency dashboard.

## Implementation Example

Our implementation also allows for explicit error handling:

```jsx
if (coinDataError) {
  return (
    <Card className="w-full w-full cursor-pointer shadow border-l-0 border-t-0 border-r-0 border-b-0 hover:border-r-10 hover:border-b-10 hover:border-blue-500 hover:shadow-md transition-all ease-in-out duration-300 relative">
      <CardContent className="p-6">
        {!coinDataLoading && (
          <Button
            size={"icon"}
            variant={"ghost"}
            className="absolute bottom-2 right-2 cursor-pointer text-muted-foreground"
            onClick={handleRefresh}
          >
            <RefreshCcw
              size={16}
              className={coinDataFetching ? "animate-spin" : ""}
            />
          </Button>
        )}
        <div className="text-center text-red-500">
          Data for &apos;{ticker}&apos; is being rate limited - Please wait a
          moment and try again.
        </div>
      </CardContent>
    </Card>
  );
}
```

This approach keeps our components clean and focused on presentation rather than data handling logic.
