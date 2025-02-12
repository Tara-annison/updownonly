const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const DELAY_BETWEEN_REQUESTS = 3000; // 3 seconds delay

class CryptoService {
    constructor() {
      this.lastRequestTime = 0;
      this.cache = new Map();
      this.cachedMarketData = null;
    }
  
    async delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    async fetchWithRetry(endpoint, retries = 3) {
      // Check cache first
      if (this.cache.has(endpoint)) {
        return this.cache.get(endpoint);
      }
  
      // Ensure minimum time between requests
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;
      if (timeSinceLastRequest < DELAY_BETWEEN_REQUESTS) {
        await this.delay(DELAY_BETWEEN_REQUESTS - timeSinceLastRequest);
      }
  
      const url = `${COINGECKO_API}${endpoint}`;
      console.log('Fetching from URL:', url);
  
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log('Raw API Response:', data);
          
          if (!data || (Array.isArray(data) && data.length === 0)) {
            throw new Error('Empty data received from API');
          }
          
          this.lastRequestTime = Date.now();
          this.cache.set(endpoint, data);
          return data;
        } catch (error) {
          console.error(`Attempt ${i + 1} failed:`, error);
          if (i === retries - 1) throw error;
          await this.delay(1000 * (i + 1));
        }
      }
    }
  
    async getMarketData() {
      try {
        // Fetch top 100 cryptocurrencies by market cap
        const endpoint = '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
        const data = await this.fetchWithRetry(endpoint);
        
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Invalid data received from API');
        }

        // Transform the data into our format
        const formattedData = data.map(crypto => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          current_price: crypto.current_price,
          market_cap_rank: crypto.market_cap_rank,
          price_change_percentage_24h: crypto.price_change_percentage_24h || 0,
          image: crypto.image
        }));
        
        console.log('Formatted Market Data:', formattedData);
        this.cachedMarketData = formattedData;
        return formattedData;
      } catch (error) {
        console.error('Error fetching market data:', error);
        // Return fallback data if API fails
        return this.getFallbackData();
      }
    }

    getCryptoName(id) {
      const names = {
        bitcoin: 'Bitcoin',
        ethereum: 'Ethereum',
        ripple: 'XRP',
        dogecoin: 'Dogecoin',
        cardano: 'Cardano'
      };
      return names[id] || id;
    }

    getCryptoSymbol(id) {
      const symbols = {
        bitcoin: 'BTC',
        ethereum: 'ETH',
        ripple: 'XRP',
        dogecoin: 'DOGE',
        cardano: 'ADA'
      };
      return symbols[id] || id.toUpperCase();
    }

    getCryptoImage(id) {
      const images = {
        bitcoin: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        ethereum: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
        ripple: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731',
        dogecoin: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256',
        cardano: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860'
      };
      return images[id] || images.bitcoin; // Fallback to Bitcoin image if not found
    }

    getFallbackData() {
      // Provide fallback data if API fails
      return [
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          current_price: 50000,
          market_cap_rank: 1,
          price_change_percentage_24h: 2.5,
          image: this.getCryptoImage('bitcoin')
        },
        {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'ETH',
          current_price: 3000,
          market_cap_rank: 2,
          price_change_percentage_24h: 1.8,
          image: this.getCryptoImage('ethereum')
        },
        // Add other cryptos as fallback...
      ];
    }
  
    async getInitialCryptos() {
      try {
        const data = await this.getMarketData();
        const initialCryptos = data.map(crypto => {
          const formatted = this.formatCryptoData(crypto);
          console.log('Formatted Initial Crypto:', formatted);
          return formatted;
        });
        return initialCryptos;
      } catch (error) {
        console.error('Error fetching initial cryptos:', error);
        throw error;
      }
    }
  
    getNextCrypto(currentScore, currentCrypto) {
      if (!this.cachedMarketData || this.cachedMarketData.length === 0) {
        throw new Error('Market data not available');
      }
  
      // Select a random crypto that's different from the current one
      const availableCryptos = this.cachedMarketData.filter(c => c.id !== currentCrypto.id);
      const selectedCrypto = availableCryptos[Math.floor(Math.random() * availableCryptos.length)];
      return this.formatCryptoData(selectedCrypto);
    }
  
    formatCryptoData(crypto) {
      if (!crypto || typeof crypto.current_price === 'undefined') {
        console.error('Invalid crypto data:', crypto);
        return {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          price: '50000.00',
          image: this.getCryptoImage('bitcoin'),
          marketCapRank: 1,
          priceChangePercentage24h: 0
        };
      }
      
      // Format price based on its value
      const price = Number(crypto.current_price);
      const formattedPrice = price < 1 ? 
        price.toFixed(4) :  // Show 4 decimal places for prices under $1
        price.toFixed(2);   // Show 2 decimal places for prices $1 and above
      
      return {
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        price: formattedPrice,
        image: crypto.image,
        marketCapRank: crypto.market_cap_rank,
        priceChangePercentage24h: crypto.price_change_percentage_24h || 0
      };
    }
}
  
export default new CryptoService();