import { getAstroApi } from "@/lib/api";
import { BodyParamsType, EventParamsType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const API_ID = import.meta.env.VITE_ASTRO_API_ID;
const API_SECRET = import.meta.env.VITE_ASTRO_API_SECRET;

// ! Creates the Authorization header required by Astronomy API
const getAuthHeader = () => {
  const credentials = btoa(`${API_ID}:${API_SECRET}`);
  return `Basic ${credentials}`;
};

export const useAstroEvents = ({
  body,
  fromDate,
  toDate,
  latitude,
  longitude,
  elevation,
}: EventParamsType) => {
  const queryParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    elevation: elevation.toString(),
    from_date: fromDate,
    to_date: toDate,
    time_zone: "0",
    time: "00:00:00",
  }).toString();

  const res = useQuery({
    queryKey: [
      "events",
      body,
      fromDate,
      toDate,
      latitude,
      longitude,
      elevation,
    ],
    queryFn: () =>
      getAstroApi(
        `/bodies/events/${body}?${queryParams}`,
        {},
        {
          Authorization: getAuthHeader(),
        }
      ),
  });

  return res;
};

export const useAstroBodies = ({
  fromDate,
  toDate,
  latitude,
  longitude,
  elevation,
}: BodyParamsType) => {
  const adjustedToDate = adjustToDate(fromDate, toDate);

  // Construct query parameters
  const queryParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    elevation: elevation.toString(),
    from_date: fromDate,
    to_date: adjustedToDate,
    time: "00:00:00",
  }).toString();

  return useQuery({
    queryKey: ["bodies", "all", fromDate, adjustedToDate, latitude, longitude],
    queryFn: async () => {
      try {
        // The API expects a GET request with query parameters
        const response = await getAstroApi(
          `/bodies/positions?${queryParams}`,
          {},
          {
            Authorization: getAuthHeader(),
          }
        );

        return response;
      } catch (error) {
        console.error("Error fetching body positions:", error);
        throw error;
      }
    },
  });
};

/**
 * Hook to fetch positions for a specific celestial body
 */
export const useAstroBody = ({
  body,
  fromDate,
  toDate,
  latitude,
  longitude,
  elevation,
}: BodyParamsType & { body: string }) => {
  const adjustedToDate = adjustToDate(fromDate, toDate);

  // Construct query parameters
  const queryParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    elevation: elevation.toString(),
    from_date: fromDate,
    to_date: adjustedToDate,
    time: "00:00:00",
  }).toString();
  return useQuery({
    queryKey: ["bodies", body, fromDate, adjustedToDate, latitude, longitude],
    queryFn: () =>
      getAstroApi(
        `/bodies/positions/${body}?${queryParams}`,
        {},
        { Authorization: getAuthHeader() }
      ),
  });
};

// todo: adjust the to date

const adjustToDate = (fromDate: string, toDate: string) => {
  const fromDateObj = new Date(fromDate);
  const toDateObj = new Date(toDate);

  const diffTime = Math.abs(toDateObj.getTime() - fromDateObj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // If range is more than 30 days, adjust the end date
  let adjustedToDate = toDate;
  if (diffDays > 30) {
    const maxDate = new Date(fromDateObj);
    maxDate.setDate(fromDateObj.getDate() + 30);
    adjustedToDate = maxDate.toISOString().split("T")[0];
    console.warn(
      `Date range too large. Limiting to 30 days from ${fromDate} to ${adjustedToDate}`
    );
  }
  return adjustedToDate;
};
