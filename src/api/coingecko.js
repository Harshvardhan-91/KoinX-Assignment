const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_TIMEOUT = 15000; // 15 seconds timeout
const API_KEY = 'CG-oGJxm5LYoK4AhKNB5se6jvJt'; 

// Helper function to handle API timeouts
const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
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
      if (i === retries - 1) throw error;
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};

// Fetch coin price data
export const fetchCoinData = async (coinId = 'bitcoin') => {
  const url = `${COINGECKO_BASE_URL}/simple/price?ids=${coinId}&vs_currencies=inr,usd&include_24hr_change=true&x_cg_api_key=${API_KEY}`;
  try {
    const data = await fetchWithRetry(url);
    if (!data[coinId]) {
      throw new Error('Coin data not found');
    }
    return data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    throw new Error(error.message);
  }
};

// Fetch trending coins
export const fetchTrendingCoins = async () => {
  const url = `${COINGECKO_BASE_URL}/search/trending?x_cg_api_key=${API_KEY}`;
  try {
    const data = await fetchWithRetry(url);
    return data.coins.slice(0, 3);
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    throw new Error(error.message);
  }
};

// Fetch details of a specific coin
export const fetchCoinDetails = async (coinId) => {
  const url = `${COINGECKO_BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&x_cg_api_key=${API_KEY}`;
  try {
    const data = await fetchWithRetry(url);
    return data;
  } catch (error) {
    console.error('Error fetching coin details:', error);
    throw new Error(error.message);
  }
};
