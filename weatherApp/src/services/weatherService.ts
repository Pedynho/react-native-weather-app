import axios from 'axios';

const API_URL = 'https://your-backend-url.com/api/weather';

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

export const getWeatherByCoordinates = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${API_URL}?latitude=${latitude}&longitude=${longitude}`);
    return JSON.parse(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};