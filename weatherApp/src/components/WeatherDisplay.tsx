import React from 'react';
import { View, Text, Image } from 'react-native';
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
        <Text className="text-lg font-medium">Loading weather data...</Text>
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
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <View className="bg-white rounded-lg p-4 shadow-md m-4">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold">{name}, {sys.country}</Text>
          <Text className="text-lg">{weather[0]?.description}</Text>
        </View>
        <Image source={{ uri: iconUrl }} className="w-16 h-16" />
      </View>
      
      <View className="mt-4">
        <Text className="text-4xl font-bold">{Math.round(main.temp)}°C</Text>
        <Text className="text-gray-600">Feels like {Math.round(main.feels_like)}°C</Text>
      </View>
      
      <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-200">
        <View className="items-center">
          <Text className="text-gray-500">Wind</Text>
          <Text className="text-lg">{wind.speed} m/s</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-500">Humidity</Text>
          <Text className="text-lg">{main.humidity}%</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-500">Pressure</Text>
          <Text className="text-lg">{main.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherDisplay;