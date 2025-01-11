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

## Project Structure
```
Harshvardhan-91-KoinX-Assignment/
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── input.css
    ├── main.jsx
    ├── Pages/
    │   ├── CoinPage.jsx
    │   └── NotFound.jsx
    ├── api/
    │   └── coingecko.js
    ├── assets/
    └── components/
        ├── About.jsx
        ├── CoinCarousel.jsx
        ├── ErrorCallback.jsx
        ├── Header.jsx
        ├── Layout.jsx
        ├── Performance.jsx
        ├── PriceSection.jsx
        ├── Sentiment.jsx
        ├── Tokemonics.jsx
        ├── TradingViewChart.jsx
        └── TrendingCoins.jsx
```

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
