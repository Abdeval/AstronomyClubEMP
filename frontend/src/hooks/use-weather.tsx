import { useQuery } from "@tanstack/react-query"
import { getWeatherData, getWeatherForecast } from "@/lib/api"
import type { WeatherData, WeatherForecast } from "@/lib/types"

interface UseWeatherOptions {
  latitude?: number
  longitude?: number
  enabled?: boolean
}

/**
 * Hook to fetch weather data for astronomy observations
 */
export function useWeather(options: UseWeatherOptions = {}) {
  const { latitude, longitude, enabled = true } = options

  return useQuery<Record<string, WeatherData>>({
    queryKey: ["weather", latitude, longitude],
    queryFn: async () => await getWeatherData(latitude, longitude),
    enabled,
    staleTime: 1000 * 60 * 30, // Consider data fresh for 30 minutes
    refetchOnWindowFocus: false,
  })
}

/**
 * Hook to fetch detailed weather forecast including location data
 */
export function useWeatherForecast(options: UseWeatherOptions = {}) {
  const { latitude, longitude, enabled = true } = options

  return useQuery<WeatherForecast>({
    queryKey: ["weatherForecast", latitude, longitude],
    queryFn: () => getWeatherForecast(latitude, longitude),
    enabled,
    staleTime: 1000 * 60 * 30, // Consider data fresh for 30 minutes
    refetchOnWindowFocus: false,
  })
}

