import { format, addDays, startOfMonth } from "date-fns"
import type { WeatherData, WeatherForecast } from "@/lib/types"

// OpenWeatherMap API key - store this in your .env file
const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || ""

// Default coordinates (can be overridden by parameters)
const DEFAULT_LAT = 40.7128 // New York
const DEFAULT_LON = -74.006

/**
 * Maps OpenWeatherMap weather conditions to our app's condition types
 */
function mapWeatherCondition(weatherId: number): WeatherData["condition"] {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  if (weatherId >= 200 && weatherId < 600) {
    return "rainy" // Thunderstorm, Drizzle, Rain
  } else if (weatherId >= 600 && weatherId < 700) {
    return "snowy" // Snow
  } else if (weatherId >= 700 && weatherId < 800) {
    return "foggy" // Atmosphere (fog, mist, etc.)
  } else if (weatherId === 800) {
    return "clear" // Clear sky
  } else {
    return "cloudy" // Clouds
  }
}

/**
 * Determines if weather conditions are suitable for astronomy observation
 */
function isSuitableForObservation(
  condition: WeatherData["condition"],
  cloudCover: number,
  visibility: number,
): boolean {
  // Criteria for good astronomy observation conditions:
  // - Clear or mostly clear skies (low cloud cover)
  // - Good visibility
  // - No precipitation
  return (
    (condition === "clear" || (condition === "cloudy" && cloudCover < 30)) &&
    visibility > 60 &&
    condition !== "rainy" &&
    condition !== "snowy" &&
    condition !== "foggy"
  )
}

/**
 * Fetches current weather data from OpenWeatherMap's free API
 */
async function getCurrentWeather(lat: number = DEFAULT_LAT, lon: number = DEFAULT_LON): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    const condition = mapWeatherCondition(data.weather[0].id)
    const cloudCover = data.clouds?.all || 0 // Cloud cover percentage
    const visibilityMeters = data.visibility || 0 // Visibility in meters (max is 10000m)
    const visibilityPercentage = Math.min(100, Math.round((visibilityMeters / 10000) * 100))

    return {
      condition,
      visibility: visibilityPercentage,
      cloudCover,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      isSuitable: isSuitableForObservation(condition, cloudCover, visibilityPercentage),
      date: format(new Date(), "yyyy-MM-dd"),
    }
  } catch (error) {
    console.error("Error fetching current weather:", error)
    throw error
  }
}


async function try30DayForecast(
  lat: number = DEFAULT_LAT,
  lon: number = DEFAULT_LON,
): Promise<Record<string, WeatherData> | null> {
  try {
    console.log("Attempting to fetch 30-day forecast...")
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`,
    )

    if (!response.ok) {
      console.warn(`30-day forecast API error: ${response.status}. This likely requires a paid subscription.`)
      return null
    }

    const data = await response.json()
    console.log("30-day forecast data:", data)

    // Process 30-day forecast data
    const forecastByDay: Record<string, WeatherData> = {}

    // The API structure might be different, adjust parsing as needed
    if (data.list && Array.isArray(data.list)) {
      data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000)
        const dateStr = format(date, "yyyy-MM-dd")

        const condition = mapWeatherCondition(item.weather[0].id)
        const cloudCover = item.clouds || 0
        // Visibility might not be available in this API
        const visibilityPercentage = item.visibility ? Math.min(100, Math.round((item.visibility / 10000) * 100)) : 70 // Default if not available

        forecastByDay[dateStr] = {
          condition,
          visibility: visibilityPercentage,
          cloudCover,
          temperature: item.temp.day,
          humidity: item.humidity,
          windSpeed: item.speed,
          isSuitable: isSuitableForObservation(condition, cloudCover, visibilityPercentage),
          date: dateStr,
        }
      })
    }

    return Object.keys(forecastByDay).length > 0 ? forecastByDay : null
  } catch (error) {
    console.error("Error fetching 30-day forecast:", error)
    return null // Return null to indicate we should fall back to 5-day forecast
  }
}


// ! Fetches 5-day forecast data from OpenWeatherMap's free API

async function get5DayForecast(
  lat: number = DEFAULT_LAT,
  lon: number = DEFAULT_LON,
): Promise<Record<string, WeatherData>> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    // Process forecast data - group by day
    const forecastByDay: Record<string, WeatherData> = {}

    // The API returns data in 3-hour intervals
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000)
      const dateStr = format(date, "yyyy-MM-dd")

      // Only process daytime forecasts (for astronomy, night conditions are more relevant,
      // but for simplicity we'll use daytime conditions)
      const hour = date.getHours()
      if (hour >= 12 && hour <= 15) {
        // Use afternoon forecast as representative of the day
        const condition = mapWeatherCondition(item.weather[0].id)
        const cloudCover = item.clouds?.all || 0
        const visibilityMeters = item.visibility || 0
        const visibilityPercentage = Math.min(100, Math.round((visibilityMeters / 10000) * 100))

        forecastByDay[dateStr] = {
          condition,
          visibility: visibilityPercentage,
          cloudCover,
          temperature: item.main.temp,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          isSuitable: isSuitableForObservation(condition, cloudCover, visibilityPercentage),
          date: dateStr,
        }
      }
    })

    return forecastByDay
  } catch (error) {
    console.error("Error fetching 5-day forecast:", error)
    throw error
  }
}

/**
 * Generates weather data for the rest of the month using patterns from the forecast
 * This is needed because the free API only provides 5 days of forecast
 */
function generateRemainingMonthData(existingData: Record<string, WeatherData>): Record<string, WeatherData> {
  const today = new Date()
  const startOfCurrentMonth = startOfMonth(today)
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

  // Create a complete month of data
  const completeMonthData: Record<string, WeatherData> = { ...existingData }

  // Get existing conditions to use as patterns
  const existingConditions = Object.values(existingData)

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), i)
    const dateStr = format(date, "yyyy-MM-dd")

    // If we don't have data for this date, generate it
    if (!completeMonthData[dateStr]) {
      // Use a pattern from existing data or generate random if we have no data
      if (existingConditions.length > 0) {
        // Pick a random existing condition as a template
        const template = existingConditions[Math.floor(Math.random() * existingConditions.length)]

        // Add some variation
        const cloudVariation = Math.floor(Math.random() * 20) - 10 // -10 to +10
        const visibilityVariation = Math.floor(Math.random() * 20) - 10 // -10 to +10

        let cloudCover = (template.cloudCover || 0) + cloudVariation
        cloudCover = Math.max(0, Math.min(100, cloudCover))

        let visibility = (template.visibility || 70) + visibilityVariation
        visibility = Math.max(0, Math.min(100, visibility))

        // Determine condition based on cloud cover
        let condition = template.condition
        if (cloudCover > 80) condition = "cloudy"
        else if (cloudCover < 20) condition = "clear"

        // Random chance for precipitation
        if (Math.random() < 0.2) condition = "rainy"

        completeMonthData[dateStr] = {
          condition,
          visibility,
          cloudCover,
          temperature: template.temperature,
          humidity: template.humidity,
          windSpeed: template.windSpeed,
          isSuitable: isSuitableForObservation(condition, cloudCover, visibility),
          date: dateStr,
        }
      } else {
        // Completely random data as fallback
        const random = Math.random()
        let condition: WeatherData["condition"]
        let visibility: number
        let cloudCover: number

        if (random < 0.5) {
          condition = "clear"
          visibility = 70 + Math.floor(Math.random() * 30)
          cloudCover = Math.floor(Math.random() * 20)
        } else if (random < 0.8) {
          condition = "cloudy"
          visibility = 40 + Math.floor(Math.random() * 30)
          cloudCover = 20 + Math.floor(Math.random() * 60)
        } else {
          condition = "rainy"
          visibility = 10 + Math.floor(Math.random() * 30)
          cloudCover = 60 + Math.floor(Math.random() * 40)
        }

        completeMonthData[dateStr] = {
          condition,
          visibility,
          cloudCover,
          temperature: 10 + Math.floor(Math.random() * 20),
          humidity: 30 + Math.floor(Math.random() * 70),
          windSpeed: Math.floor(Math.random() * 10),
          isSuitable: isSuitableForObservation(condition, cloudCover, visibility),
          date: dateStr,
        }
      }
    }
  }

  return completeMonthData
}


//  ! Fetches weather forecast data from OpenWeatherMap's APIs
//  ! Tries to use 30-day forecast if available, falls back to 5-day forecast
 
export async function getWeatherForecast(
  lat: number = DEFAULT_LAT,
  lon: number = DEFAULT_LON,
): Promise<WeatherForecast> {
  try {
    // Get current weather
    const currentWeather = await getCurrentWeather(lat, lon)

    // Try to get 30-day forecast first (requires paid subscription)
    const forecast30Day = await try30DayForecast(lat, lon)

    // If 30-day forecast is available, use it
    let combinedData: Record<string, WeatherData> = {}

    if (forecast30Day && Object.keys(forecast30Day).length > 0) {
      console.log("Using 30-day forecast data")
      combinedData = {
        [currentWeather.date!]: currentWeather,
        ...forecast30Day,
      }
    } else {
      // Fall back to 5-day forecast
      console.log("Falling back to 5-day forecast")
      const forecast5Day = await get5DayForecast(lat, lon)

      combinedData = {
        [currentWeather.date!]: currentWeather,
        ...forecast5Day,
      }
    }

    // Generate data for the rest of the month
    const completeMonthData = generateRemainingMonthData(combinedData)

    // Get location info
    const locationResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`,
    )

    let location = {
      name: "Unknown Location",
      country: "",
      lat,
      lon,
    }

    if (locationResponse.ok) {
      const locationData = await locationResponse.json()
      if (locationData.length > 0) {
        location = {
          name: locationData[0].name || "Unknown Location",
          country: locationData[0].country || "",
          lat,
          lon,
        }
      }
    }

    return {
      daily: completeMonthData,
      location,
    }
  } catch (error) {
    console.error("Error fetching weather data:", error)
    // Return fallback data if API calls fail
    return {
      daily: getFallbackWeatherData(),
      location: {
        name: "Unknown Location",
        country: "",
        lat,
        lon,
      },
    }
  }
}

/**
 * Generates fallback weather data if the API calls fail
 */
function getFallbackWeatherData(): Record<string, WeatherData> {
  const today = new Date()
  const startOfCurrentMonth = startOfMonth(today)
  const weatherData: Record<string, WeatherData> = {}

  // Generate weather data for the current month
  for (let i = 0; i < 31; i++) {
    const date = addDays(startOfCurrentMonth, i)
    const dateStr = format(date, "yyyy-MM-dd")

    // Randomly generate weather conditions
    const random = Math.random()
    let condition: WeatherData["condition"]
    let visibility: number
    let cloudCover: number

    if (random < 0.5) {
      condition = "clear"
      visibility = 70 + Math.floor(Math.random() * 30) // 70-100%
      cloudCover = Math.floor(Math.random() * 20) // 0-20%
    } else if (random < 0.8) {
      condition = "cloudy"
      visibility = 40 + Math.floor(Math.random() * 30) // 40-70%
      cloudCover = 20 + Math.floor(Math.random() * 60) // 20-80%
    } else {
      condition = "rainy"
      visibility = 10 + Math.floor(Math.random() * 30) // 10-40%
      cloudCover = 60 + Math.floor(Math.random() * 40) // 60-100%
    }

    // Determine if conditions are suitable for astronomy observation
    const isSuitable = isSuitableForObservation(condition, cloudCover, visibility)

    weatherData[dateStr] = {
      condition,
      visibility,
      cloudCover,
      temperature: 10 + Math.floor(Math.random() * 20), // 10-30°C
      humidity: 30 + Math.floor(Math.random() * 70), // 30-100%
      windSpeed: Math.floor(Math.random() * 10), // 0-10 m/s
      isSuitable,
      date: dateStr,
    }
  }

  return weatherData
}

/**
 * Main function to get weather data for astronomy observations
 */
export async function getWeatherData(
  lat: number = DEFAULT_LAT,
  lon: number = DEFAULT_LON,
): Promise<Record<string, WeatherData>> {
  try {
    const forecast = await getWeatherForecast(lat, lon)
    console.log(forecast);
    return forecast.daily
  } catch (error) {
    console.error("Failed to get weather data:", error)
    return getFallbackWeatherData()
  }
}

