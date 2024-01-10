// utils/fetchGasPrice.ts
import axios from 'axios';
import cheerio from 'cheerio';

export const fetchGasPrice = async (): Promise<number | null> => {
  try {
    const response = await axios.get('https://www.caa.ca/gas-prices/');
    const $ = cheerio.load(response.data);
    const gasPrice = $('.national_single_price').text().trim();
    return parseFloat(gasPrice);
  } catch (error: any) {
    console.error('Error:', error.message);
    return null;
  }
};


async function retrieveNationalSinglePrice(url: string): Promise<number | undefined> {
    try {
      const response = await fetch(url);
      const html = await response.text();

      const doc = new DOMParser().parseFromString(html, 'text/html');
      const nationalSinglePriceElement = doc.querySelector('.national_single_price');

      if (nationalSinglePriceElement) {
        const priceString = nationalSinglePriceElement.textContent?.trim();
        if (priceString) {
          return parseFloat(priceString);
        }
      }

      return undefined;
    } catch (error: any) {
      console.error('Error fetching or parsing HTML:', error.message);
      return undefined;
    }
  }