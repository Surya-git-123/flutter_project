// utils/weather.js

const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

/**
 * Fetches current weather data for a given city.
 * @param {string} city - The city name to fetch weather for.
 * @returns {Promise<string>} - A string describing the weather.
 */
async function getWeather(city) {
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHER_API_KEY') {
    console.warn('OpenWeatherMap API Key is not set. Returning placeholder weather.');
    return `Weather for ${city}: Sunny (Placeholder)`;
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // or 'imperial'
      },
    });

    const data = response.data;
    const weatherDescription = data.weather[0].description;
    const temp = data.main.temp;
    const weatherString = `${weatherDescription}, ${temp}°C in ${data.name}`;

    return weatherString;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return `Weather for ${city}: Unknown (API Error)`;
  }
}

module.exports = { getWeather };
