# KoinX Frontend Assignment

## Overview
A React-based cryptocurrency tracking application that displays real-time price data, charts, and trending coins using the CoinGecko API and TradingView widgets.

## Live Demo
https://cryptokoinx.netlify.app/bitcoin

## Features
- Real-time Bitcoin price tracking in USD and INR
- TradingView chart integration
- Trending cryptocurrencies display
- Responsive design
- Dynamic coin data based on URL parameters (Optional)
- Horizontally scrollable coin carousels
- Detailed token information and metrics

## Technologies Used
- React.js
- Tailwind CSS
- Vite
- CoinGecko API
- TradingView Widget

## API Integration

### CoinGecko APIs Used
1. Price Data (/simple/price)
   ```
   Parameters:
   - ids: bitcoin
   - vs_currencies: inr,usd
   - include_24hr_change: true
   ```
2. Trending Coins (/search/trending)
   - Used for "Trending Coins (24h)" and "You May Also Like" sections
   - Includes coin logos, symbols, price changes, and sparkline graphs
