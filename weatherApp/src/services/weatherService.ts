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
    // const response = await axios.get(`${API_URL}?latitude=${latitude}&longitude=${longitude}`);
    const weatherData = {
      main: {
        temp: 25.6,
        feels_like: 27.3,
        humidity: 65,
        pressure: 1015
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d"
        }
      ],
      wind: {
        speed: 5.5,
        deg: 150
      },
      name: "London",
      sys: {
        country: "GB"
      }
    };
    return weatherData;
    // return JSON.parse(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};