---
sidebar_position: 6
---

# CoinGecko API

Learn how the **BlockHouse application** leverages the **CoinGecko API** to fetch cryptocurrency data.

## API Integration

BlockHouse uses the CoinGecko API to retrieve real-time price data for cryptocurrencies.

### Endpoint Documentation

The application primarily uses the `/coins/{id}` endpoint:
```
https://api.coingecko.com/api/v3/coins/{id}
```

This endpoint provides comprehensive data about a specific cryptocurrency, including:
- Current market prices in various currencies
- Market capitalization
- Trading volume
- Price changes (24h, 7d, etc.)
- Historical data
- Community metrics
- Developer activity

### Implementation

In the BlockHouse application, the API is called as follows:

```
const response = await api.get(`https://api.coingecko.com/api/v3/coins/${ticker}`);
return response.data;
```

Where `ticker` represents the cryptocurrency ID (e.g., "bitcoin", "ethereum", etc.).

### Key Parameters

When using the endpoint, you can customize the response with these parameters:
- `localization`: Include localized data (default: true)
- `tickers`: Include exchange ticker data (default: true)
- `market_data`: Include price and market data (default: true)
- `community_data`: Include community metrics (default: true)
- `developer_data`: Include developer activity metrics (default: true)
- `sparkline`: Include 7-day sparkline data (default: false)

### API Considerations

- The CoinGecko API refreshes data every 60 seconds
- You'll need to obtain your API key from the CoinGecko website
- The free tier has rate limits you should be aware of
- The `id` parameter can be found via the `/coins/list` endpoint or on the CoinGecko website

## What's next?

- Explore the [official CoinGecko API documentation](https://docs.coingecko.com/)
- Consider adding support for more cryptocurrencies
- Implement additional data visualizations with the retrieved data
- Add historical price charts using CoinGecko's historical data endpoints
- Set up automated data refreshing to keep prices current