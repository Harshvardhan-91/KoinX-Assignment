const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_TIMEOUT = 15000; // 15 seconds timeout

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

export const fetchCoinData = async (coinId = 'bitcoin') => {
  try {
    const data = await fetchWithRetry(
      `${COINGECKO_BASE_URL}/simple/price?ids=${coinId}&vs_currencies=inr,usd&include_24hr_change=true`
    );
    
    if (!data[coinId]) {
      throw new Error('Coin data not found');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    throw new Error(
      error.name === 'AbortError' 
        ? 'Request timed out. Please try again.' 
        : 'Failed to fetch coin data. Please check your connection and try again.'
    );
  }
};

export const fetchTrendingCoins = async () => {
  try {
    const data = await fetchWithRetry(`${COINGECKO_BASE_URL}/search/trending`);
    return data.coins.slice(0, 3);
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    throw new Error(
      error.name === 'AbortError'
        ? 'Request timed out. Please try again.'
        : 'Failed to fetch trending coins. Please check your connection and try again.'
    );
  }
};

export const fetchCoinDetails = async (coinId) => {
  try {
    const data = await fetchWithRetry(
      `${COINGECKO_BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
    );
    return data;
  } catch (error) {
    console.error('Error fetching coin details:', error);
    throw new Error(
      error.name === 'AbortError'
        ? 'Request timed out. Please try again.'
        : 'Failed to fetch coin details. Please check your connection and try again.'
    );
  }
};