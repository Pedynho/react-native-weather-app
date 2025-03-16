import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { WeatherData } from '../services/weatherService';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, loading, error }) => {
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-medium text-black">Loading weather data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-medium text-red-500">Error: {error}</Text>
      </View>
    );
  }

  if (!weatherData) {
    return null;
  }

  const { main, weather, wind, name, sys } = weatherData;
  const weatherIcon = weather[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`;

  const getWeatherEmoji = () => {
    const condition = weather[0]?.main?.toLowerCase();
    if (condition?.includes('clear')) return '☀️';
    if (condition?.includes('cloud')) return '☁️';
    if (condition?.includes('rain')) return '🌧️';
    if (condition?.includes('snow')) return '❄️';
    if (condition?.includes('thunderstorm')) return '⚡';
    return '🌤️';
  };

  return (
    <View className="flex-1 items-center justify-center px-6 bg-blue-50 rounded-[10vw]">
      {/* City and Weather Details */}
      <View className="px-6 pt-6 pb-2">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-black text-3xl font-bold">{name}</Text>
            <Text className="text-black text-lg opacity-80">{sys.country}</Text>
          </View>
          <Text className="text-black text-5xl">{getWeatherEmoji()}</Text>
        </View>
        
        {/* Temperature Display */}
        <View className="items-center my-8">
          <View className="flex-row items-start">
            <Text className="text-black text-7xl font-bold">{Math.round(main.temp)}</Text>
            <Text className="text-black text-3xl font-bold mt-1">°C</Text>
          </View>
          <Text className="text-black text-xl mt-2 capitalize">{weather[0]?.description}</Text>
          <Text className="text-black text-md opacity-80">Feels like {Math.round(main.feels_like)}°C</Text>
        </View>
      </View>
      
      {/* Weather Details Footer */}
      <View className="bg-white bg-opacity-20 p-6 m-2 flex-row justify-between rounded-[10vw]">
        <View className="items-center">
          <Text className="text-black opacity-80">Wind</Text>
          <Text className="text-black text-lg font-medium">{wind.speed} m/s</Text>
        </View>
        <View className="items-center">
          <Text className="text-black opacity-80">Humidity</Text>
          <Text className="text-black text-lg font-medium">{main.humidity}%</Text>
        </View>
        <View className="items-center">
          <Text className="text-black opacity-80">Pressure</Text>
          <Text className="text-black text-lg font-medium">{main.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  weatherIcon: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
});

export default WeatherDisplay;