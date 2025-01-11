const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_TIMEOUT = 15000; // 15 seconds timeout
const API_KEY = 'CG-oGJxm5LYoK4AhKNB5se6jvJt';

// Rate limiting variables
let lastCallTime = 0;
const RATE_LIMIT_DELAY = 1500; // 1.5 seconds between calls

// Helper function to handle rate limiting
const waitForRateLimit = async () => {
  const now = Date.now();
  const timeSinceLastCall = now - lastCallTime;
  if (timeSinceLastCall < RATE_LIMIT_DELAY) {
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastCall));
  }
  lastCallTime = Date.now();
};

// Helper function to handle API timeouts
const fetchWithTimeout = async (url, options = {}) => {
  await waitForRateLimit();
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'x-cg-api-key': API_KEY,
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } finally {
    clearTimeout(timeout);
  }
};

// Retry logic for API calls
const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchWithTimeout(url, options);
    } catch (error) {
      if (i === retries - 1 || error.message.includes('Rate limit')) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};

// Fetch coin price data
export const fetchCoinData = async (coinId = 'bitcoin') => {
  const url = `${COINGECKO_BASE_URL}/simple/price?ids=${coinId}&vs_currencies=inr,usd&include_24hr_change=true`;
  try {
    const data = await fetchWithRetry(url);
    if (!data[coinId]) {
      throw new Error('Coin data not found');
    }
    return data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    throw error;
  }
};

// Fetch trending coins
export const fetchTrendingCoins = async () => {
  const url = `${COINGECKO_BASE_URL}/search/trending`;
  try {
    const data = await fetchWithRetry(url);
    return data.coins;
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    throw error;
  }
};

// Fetch details of a specific coin
export const fetchCoinDetails = async (coinId) => {
  const url = `${COINGECKO_BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;
  try {
    const data = await fetchWithRetry(url);
    return data;
  } catch (error) {
    console.error('Error fetching coin details:', error);
    throw error;
  }
};