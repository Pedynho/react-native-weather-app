import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, RefreshControl } from 'react-native';
import { getCurrentPosition } from './src/services/locationService';
import { getWeatherByCoordinates, WeatherData } from './src/services/weatherService';
import WeatherDisplay from './src/components/WeatherDisplay';

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const coordinates = await getCurrentPosition();
      const data = await getWeatherByCoordinates(coordinates.latitude, coordinates.longitude);
      
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeatherData();
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="py-6 px-4">
          <Text className="text-3xl font-bold text-center text-blue-800 mb-6">
            Weather Forecast
          </Text>
          <WeatherDisplay
            weatherData={weatherData}
            loading={loading}
            error={error}
          />
          {weatherData && (
            <Text className="text-center text-gray-500 mt-4">
              Pull down to refresh
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;