import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  TrendingUp,
  RefreshCcw,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useGetCoinData } from "@/hooks/coins";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

function CoinCard({ ticker }: { ticker: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    data: coinData,
    isLoading: coinDataLoading,
    isError: coinDataError,
    refetch: coinDataRefetch,
    isFetching: coinDataFetching,
  } = useGetCoinData(ticker.toLowerCase());

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 6,
    }).format(price);
  };

  const getPriceHistory = () => {
    const basePrice = coinData?.market_data?.current_price?.usd || 80000;
    return Array.from({ length: 30 }).map((_, i) => ({
      day: i + 1,
      price: basePrice * (0.9 + Math.random() * 0.2),
    }));
  };

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

  const handleRefresh = async () => {
    console.log("Coin data refetched");
    await coinDataRefetch();

    setIsDialogOpen(false);
  };

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

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
        ) : (
          <>
            <DialogTrigger asChild>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {coinData?.image?.thumb && (
                      <Image
                        width={32}
                        height={32}
                        src={coinData.image.thumb}
                        alt={coinData.name}
                        className="w-8 h-8"
                        onError={(e) => {
                          e.currentTarget.src = "/api/placeholder/32/32";
                        }}
                      />
                    )}
                    <CardTitle className="flex flex-row items-center hover:underline hover:text-blue-500">
                      {coinData?.name || ticker}
                      <SquareArrowOutUpRight size={16} className="ml-2" />
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="uppercase">
                    {coinData?.symbol || ticker}
                  </Badge>
                </div>
              </CardHeader>
            </DialogTrigger>
            <CardContent>
              <div className="mt-2 mb-6">
                <div className="text-3xl font-bold">
                  {formatPrice(coinData?.market_data?.current_price?.usd)}
                </div>
                <div className="flex items-center mt-1">
                  <span
                    className={getChangeColor(
                      coinData?.market_data?.price_change_percentage_24h
                    )}
                  >
                    {getChangeIcon(
                      coinData?.market_data?.price_change_percentage_24h
                    )}
                  </span>
                  <span
                    className={`ml-1 ${getChangeColor(
                      coinData?.market_data?.price_change_percentage_24h
                    )}`}
                  >
                    {coinData?.market_data?.price_change_percentage_24h?.toFixed(
                      2
                    )}
                    % (24h)
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-between text-sm">
                <div className="flex flex-col">
                  <div className="font-semibold text-muted-foreground ">
                    Market Cap Rank
                  </div>
                  <div className="text-muted-foreground/80">
                    #{coinData?.market_cap_rank || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">
                    24h Volume
                  </div>
                  <div className="text-muted-foreground/80">
                    {formatPrice(coinData?.market_data?.total_volume?.usd)}
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>

      <DialogContent className="min-w-[100dvw] h-[100dvh] p-0">
        {!coinDataLoading && (
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 pt-6">
              <div className="flex items-center space-x-3">
                {coinData?.image?.small && (
                  <Image
                    width={40}
                    height={40}
                    src={coinData.image.small}
                    alt={coinData.name}
                    className="w-10 h-10"
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/40/40";
                    }}
                  />
                )}
                <DialogTitle className="text-xl">
                  {coinData?.name} ({coinData?.symbol?.toUpperCase()})
                </DialogTitle>
                <Badge
                  variant={
                    coinData?.market_cap_rank <= 10 ? "default" : "outline"
                  }
                >
                  Rank #{coinData?.market_cap_rank}
                </Badge>
              </div>
            </DialogHeader>

            <div className="flex flex-col flex-1 overflow-hidden">
              <Tabs defaultValue="overview" className="mt-4">
                <div className="px-6">
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="flex-1 p-6">
                  <TabsContent value="overview" className="mt-4 m-0 p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="py-0 my-0">
                          <CardTitle className="text-lg">Price</CardTitle>
                        </CardHeader>
                        <CardContent className="py-0 my-0">
                          <div className="text-2xl font-bold">
                            {formatPrice(
                              coinData?.market_data?.current_price?.usd
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            <span
                              className={getChangeColor(
                                coinData?.market_data
                                  ?.price_change_percentage_24h
                              )}
                            >
                              {getChangeIcon(
                                coinData?.market_data
                                  ?.price_change_percentage_24h
                              )}
                            </span>
                            <span
                              className={`ml-1 ${getChangeColor(
                                coinData?.market_data
                                  ?.price_change_percentage_24h
                              )}`}
                            >
                              {coinData?.market_data?.price_change_percentage_24h?.toFixed(
                                2
                              )}
                              % (24h)
                            </span>
                          </div>

                          <div className="mt-4 h-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={getPriceHistory()}>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  strokeOpacity={0.1}
                                />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                  type="monotone"
                                  dataKey="price"
                                  stroke="#8884d8"
                                  strokeWidth={2}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="py-0 my-0">
                          <CardTitle className="text-lg">
                            Market Stats
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-0 my-0">
                          <div className="space-y-3">
                            <div className="flex flex-col justify-between">
                              <span className="text-gray-500">Market Cap</span>
                              <span className="font-medium">
                                {formatPrice(
                                  coinData?.market_data?.market_cap?.usd
                                )}
                              </span>
                            </div>
                            <div className="flex flex-col justify-between">
                              <span className="text-gray-500">
                                24h Trading Vol
                              </span>
                              <span className="font-medium">
                                {formatPrice(
                                  coinData?.market_data?.total_volume?.usd
                                )}
                              </span>
                            </div>
                            <div className="flex flex-col justify-between">
                              <span className="text-gray-500">
                                Circulating Supply
                              </span>
                              <span className="font-medium">
                                {coinData?.market_data?.circulating_supply?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex flex-col justify-between">
                              <span className="text-gray-500">Max Supply</span>
                              <span className="font-medium">
                                {coinData?.market_data?.max_supply?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {coinData?.description?.en && (
                      <Card className="mt-4">
                        <CardHeader className="py-0 my-0">
                          <CardTitle className="text-lg">
                            About {coinData.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-0 my-0">
                          <ScrollArea className="h-26">
                            <div className="text-sm">
                              {coinData.description.en}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="performance" className="mt-4 m-0 p-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Price Change</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              label: "24h",
                              value:
                                coinData?.market_data
                                  ?.price_change_percentage_24h,
                            },
                            {
                              label: "7d",
                              value:
                                coinData?.market_data
                                  ?.price_change_percentage_7d,
                            },
                            {
                              label: "30d",
                              value:
                                coinData?.market_data
                                  ?.price_change_percentage_30d,
                            },
                            {
                              label: "1y",
                              value:
                                coinData?.market_data
                                  ?.price_change_percentage_1y,
                            },
                          ].map((period) => (
                            <div
                              key={period.label}
                              className="flex items-center"
                            >
                              <div className="w-10 text-gray-500">
                                {period.label}
                              </div>
                              <div className="w-full max-w-md mx-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    period.value >= 0
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }`}
                                  style={{
                                    width: `${Math.min(
                                      Math.abs(period.value || 0),
                                      100
                                    )}%`,
                                  }}
                                />
                              </div>
                              <div className={getChangeColor(period.value)}>
                                {period.value?.toFixed(2)}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          All-Time Stats
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-gray-500 mb-1">
                              All-Time High
                            </div>
                            <div className="font-bold">
                              {formatPrice(coinData?.market_data?.ath?.usd)}
                            </div>
                            <div
                              className={getChangeColor(
                                coinData?.market_data?.ath_change_percentage
                                  ?.usd
                              )}
                            >
                              {coinData?.market_data?.ath_change_percentage?.usd?.toFixed(
                                2
                              )}
                              %
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(
                                coinData?.market_data?.ath_date?.usd
                              ).toLocaleDateString()}
                            </div>
                          </div>

                          <div>
                            <div className="text-gray-500 mb-1">
                              All-Time Low
                            </div>
                            <div className="font-bold">
                              {formatPrice(coinData?.market_data?.atl?.usd)}
                            </div>
                            <div
                              className={getChangeColor(
                                coinData?.market_data?.atl_change_percentage
                                  ?.usd
                              )}
                            >
                              {coinData?.market_data?.atl_change_percentage?.usd?.toFixed(
                                2
                              )}
                              %
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(
                                coinData?.market_data?.atl_date?.usd
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="details" className="mt-4 m-0 p-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Additional Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {coinData?.genesis_date && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Genesis Date
                              </span>
                              <span className="font-medium">
                                {coinData.genesis_date}
                              </span>
                            </div>
                          )}
                          {coinData?.hashing_algorithm && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Hashing Algorithm
                              </span>
                              <span className="font-medium">
                                {coinData.hashing_algorithm}
                              </span>
                            </div>
                          )}
                          {coinData?.categories && (
                            <div>
                              <div className="text-gray-500 mb-2">
                                Categories
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {coinData.categories
                                  .slice(0, 5)
                                  .map((category: string, index: number) => (
                                    <Badge key={index} variant="secondary">
                                      {category}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          )}
                          {coinData?.links?.homepage[0] && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">Website</span>
                              <a
                                href={coinData.links.homepage[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-500 hover:underline"
                              >
                                {coinData.links.homepage[0]
                                  .replace("http://", "")
                                  .replace("https://", "")
                                  .replace("www.", "")}
                                <ExternalLink className="ml-1 h-4 w-4" />
                              </a>
                            </div>
                          )}
                          {coinData?.links?.blockchain_site &&
                            coinData.links.blockchain_site[0] && (
                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">Explorer</span>
                                <a
                                  href={coinData.links.blockchain_site[0]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center text-blue-500 hover:underline"
                                >
                                  {coinData.links.blockchain_site[0]
                                    .replace("http://", "")
                                    .replace("https://", "")
                                    .replace("www.", "")}
                                  <ExternalLink className="ml-1 h-4 w-4" />
                                </a>
                              </div>
                            )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle className="text-lg">Community</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {coinData?.links?.subreddit_url && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">Reddit</span>
                              <a
                                href={coinData.links.subreddit_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-500 hover:underline"
                              >
                                {coinData.links.subreddit_url.split("/").pop()}
                                <ExternalLink className="ml-1 h-4 w-4" />
                              </a>
                            </div>
                          )}
                          {coinData?.links?.twitter_screen_name && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">Twitter</span>
                              <a
                                href={`https://twitter.com/${coinData.links.twitter_screen_name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-500 hover:underline"
                              >
                                @{coinData.links.twitter_screen_name}
                                <ExternalLink className="ml-1 h-4 w-4" />
                              </a>
                            </div>
                          )}
                          {coinData?.sentiment_votes_up_percentage && (
                            <div>
                              <div className="text-gray-500 mb-2">
                                Community Sentiment
                              </div>
                              <div className="flex items-center">
                                <div className="w-full max-w-md h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-green-500"
                                    style={{
                                      width: `${coinData.sentiment_votes_up_percentage}%`,
                                    }}
                                  />
                                </div>
                                <div className="ml-2 text-sm">
                                  {coinData.sentiment_votes_up_percentage}%
                                  Positive
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CoinCard;
