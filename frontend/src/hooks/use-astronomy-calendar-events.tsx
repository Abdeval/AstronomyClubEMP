import { useState, useEffect } from "react";
import { format, addDays, setHours, setMinutes } from "date-fns";
import { useAstroBodies } from "./use-astro";
import { useWeather } from "@/hooks/use-weather";
import type { AstronomyEvent } from "@/lib/types";
import { getAstronomyEvents } from "@/lib/data";

interface UseAstronomyCalendarEventsProps {
  latitude: number;
  longitude: number;
  startDate?: Date;
  endDate?: Date;
  includeStaticEvents?: boolean;
}

/**
 * Hook to generate astronomy calendar events from celestial body positions and weather data
 */
export function useAstronomyCalendarEvents({
  latitude,
  longitude,
  startDate = new Date(),
  endDate,
  includeStaticEvents = true,
}: UseAstronomyCalendarEventsProps) {
  const [events, setEvents] = useState<AstronomyEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Format dates for API
  const fromDate = format(startDate, "yyyy-MM-dd");
  const toDate = format(endDate || addDays(startDate, 30), "yyyy-MM-dd");

  // Fetch celestial body positions
  const {
    data: bodiesData,
    isLoading: isBodiesLoading,
    error: bodiesError,
  } = useAstroBodies({
    fromDate,
    toDate,
    latitude,
    longitude,
    elevation: 0,
  });

  // Fetch weather data
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useWeather({
    latitude,
    longitude,
  });

  useEffect(() => {
    const generateEvents = async () => {
      try {
        setIsLoading(true);

        // Wait for both data sources to load
        if (isBodiesLoading || isWeatherLoading) return;

        // Handle errors
        if (bodiesError) throw bodiesError;
        if (weatherError) throw weatherError;

        let allEvents: AstronomyEvent[] = [];

        // Add static events if requested
        if (includeStaticEvents) {
          allEvents = [...getAstronomyEvents()];
        }

        // Process celestial body data if available
        if (bodiesData?.data?.table?.rows) {
          const dynamicEvents = generateEventsFromBodiesData(
            bodiesData,
            weatherData || {}
          );
          allEvents = [...allEvents, ...dynamicEvents];
        }

        setEvents(allEvents);
      } catch (err) {
        console.error("Error generating astronomy events:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    generateEvents();
  }, [
    bodiesData,
    weatherData,
    isBodiesLoading,
    isWeatherLoading,
    bodiesError,
    weatherError,
    includeStaticEvents,
  ]);

  /**
   * Generate events from celestial body positions
   */
  const generateEventsFromBodiesData = (
    bodiesData: any,
    weatherData: any
  ): AstronomyEvent[] => {
    const dynamicEvents: AstronomyEvent[] = [];

    if (
      !bodiesData?.data?.table?.rows ||
      !bodiesData.data.table.rows[0]?.cells
    ) {
      return dynamicEvents;
    }

    const rows = bodiesData.data.table.rows;
    // const firstRow = rows[0];

    // Process each celestial body

    rows.forEach((row: any, rowIndex: number) =>
      row.cells.forEach((cell: any, bodyIndex: number) => {
        const bodyId = cell.id;
        const bodyName = cell.name;

        if (!bodyId || !bodyName) return;

        // Skip the sun for night viewing events
        if (bodyId === "sun") {
          // Add sunrise/sunset events instead
          addSunEvents(rows, dynamicEvents, weatherData);
          return;
        }

        // Find optimal viewing opportunities
        const viewingOpportunities = findOptimalViewingOpportunities(
          rows,
          bodyIndex,
          weatherData
        );

        // Create events for each opportunity
        viewingOpportunities.forEach((opportunity, index) => {
          const { date, altitude, azimuth, magnitude, isSuitable } =
            opportunity;

          // Parse the date
          const eventDate = new Date(date);
          const dateStr = format(eventDate, "yyyy-MM-dd");

          // Create event title and description
          const title = `${bodyName} Viewing`;
          const description = `Optimal time to view ${bodyName}. Altitude: ${altitude.toFixed(
            1
          )}°, Azimuth: ${azimuth.toFixed(1)}°${
            magnitude !== undefined
              ? `, Magnitude: ${magnitude.toFixed(2)}`
              : ""
          }`;

          // Set event times (typically evening/night for 2 hours)
          const start = setHours(eventDate, 21); // 9 PM
          const end = setHours(eventDate, 23); // 11 PM

          // Create the event

          dynamicEvents.push({
            id: `${bodyId}-viewing-${dateStr}-${index}`,
            title,
            description,
            type: "planet-viewing", // Use planet-viewing for all celestial bodies
            start,
            end,
            visibilityRequirements: "Clear skies, low light pollution",
            isSuitable,
            body: {
              id: bodyId,
              name: bodyName,
              altitude,
              azimuth,
              magnitude,
            },
          });
        });
      })
    );
    
    console.log("dynamic events: ", dynamicEvents);
    return dynamicEvents;
  };

  /**
   * Add sunrise and sunset events
   */
  const addSunEvents = (
    rows: any[],
    events: AstronomyEvent[],
    weatherData: any
  ) => {
    rows.forEach((row: any) => {
      const sunCell = row.cells.find((cell: any) => cell.id === "sun");
      if (!sunCell) return;

      const date = row.entry?.date || row.cells[0].date;
      if (!date) return;

      const eventDate = new Date(date);
      const dateStr = format(eventDate, "yyyy-MM-dd");
      const weather = weatherData[dateStr];
      const isSuitable = weather?.isSuitable ?? true;

      // Add sunrise event (around 6 AM)
      const sunriseTime = setHours(setMinutes(eventDate, 0), 6);
      events.push({
        id: `sunrise-${dateStr}`,
        title: "Sunrise",
        description: "The sun rises above the horizon.",
        type: "sun-event",
        start: sunriseTime,
        end: setMinutes(sunriseTime, 30),
        isSuitable,
        body: {
          id: "sun",
          name: "Sun",
          altitude: 0, // Approximate
          azimuth: 90, // Approximate (East)
        },
      });

      // Add sunset event (around 6 PM)
      const sunsetTime = setHours(setMinutes(eventDate, 0), 18);
      events.push({
        id: `sunset-${dateStr}`,
        title: "Sunset",
        description: "The sun sets below the horizon.",
        type: "sun-event",
        start: sunsetTime,
        end: setMinutes(sunsetTime, 30),
        isSuitable,
        body: {
          id: "sun",
          name: "Sun",
          altitude: 0, // Approximate
          azimuth: 270, // Approximate (West)
        },
      });
    });
  };

  /**
   * Find optimal viewing opportunities for a celestial body
   */
  const findOptimalViewingOpportunities = (
    rows: any[],
    bodyIndex: number,
    weatherData: any
  ) => {
    const opportunities: Array<{
      date: string;
      altitude: number;
      azimuth: number;
      magnitude?: number;
      isSuitable: boolean;
    }> = [];

    rows.forEach((row: any) => {
      if (!row.cells || !row.cells[bodyIndex]) return;

      const cell = row.cells[bodyIndex];
      const date = row.entry?.date || cell.date;
      if (!date) return;

      const dateStr = format(new Date(date), "yyyy-MM-dd");
      const weather = weatherData[dateStr];

      // Get position data
      const altitude = Number.parseFloat(
        cell.position?.horizontal?.altitude?.degrees || "0"
      );
      const azimuth = Number.parseFloat(
        cell.position?.horizontal?.azimuth?.degrees || "0"
      );
      const magnitude = cell.extraInfo?.magnitude;

      // Check if this is a good viewing opportunity
      // Criteria: Body is above horizon (altitude > 0) and not too low
      if (altitude > 15) {
        opportunities.push({
          date,
          altitude,
          azimuth,
          magnitude,
          isSuitable: weather?.isSuitable ?? true,
        });
      }
    });

    // Sort by altitude (higher is better for viewing)
    return opportunities.sort((a, b) => b.altitude - a.altitude).slice(0, 3); // Top 3 opportunities
  };

  return {
    events,
    isLoading,
    error,
  };
}
