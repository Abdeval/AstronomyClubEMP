import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { EquipmentGroup, EquipmentStatus } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getGroupLabel(group: EquipmentGroup): string {
  switch (group) {
    case "webdev":
      return "Web Development"
    case "rovers":
      return "Rovers"
    case "astrography":
      return "Astrography"
    default:
      return group
  }
}

export function getStatusBadgeVariant(status: EquipmentStatus): string {
  switch (status) {
    case "available":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    case "in-use":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    case "maintenance":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    case "broken":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
  }
}


// /**
//  * ! Makes an authenticated request to the Astronomy API
//  */
// export const fetchFromAstronomyApi = async (endpoint: string, options = {}) => {
//   try {
//     const headers = {
//       Authorization: getAuthHeader(),
//       "Content-Type": "application/json",
//     }


//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       ...options,
//       headers: {
//         ...headers,
//         ...(options as any).headers,
//       },
//     })

//     console.log("Response status:", response.status)
//     console.log("Response headers:", Object.fromEntries([...response.headers.entries()]))

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null)
//       console.error("API Error:", errorData)
//       throw new Error(`API request failed: ${response.status} ${response.statusText}`)
//     }

//     return await response.json()
//   } catch (error) {
//     console.error("Error fetching from Astronomy API:", error)
//     throw error
//   }
// }

// /**
//  * ! Get upcoming astronomical events
//  */
// export const getAstronomicalEvents = async (startDate: string, endDate: string) => {
//   return fetchFromAstronomyApi("/studio/star-chart", {
//     method: "POST",
//     body: JSON.stringify({
//       style: "default",
//       observer: {
//         latitude: 33.775867,
//         longitude: -84.39733,
//         date: startDate,
//         endDate
//       },
//       view: {
//         type: "area",
//         parameters: {
//           position: {
//             equatorial: {
//               rightAscension: 0,
//               declination: 0,
//             },
//           },
//           zoom: 2,
//         },
//       },
//     }),
//   })
// }

// // ! get moon phase 
// export const getMoonPhase = async (date = "2020-11-01") => {
//   return fetchFromAstronomyApi("/studio/moon-phase", {
//     method: "POST",
//     body: JSON.stringify({
//       format: "png",
//       style: {
//         "moonStyle": "sketch",
//         "backgroundStyle": "stars",
//         "backgroundColor": "red",
//         "headingColor": "white",
//         "textColor": "blue"
//       },
//       observer: {
//         "latitude": 6.56774,
//         "longitude": 79.88956,
//         date
//       },
//       view: {
//         "type": "portrait-simple",
//         "orientation": "south-up"
//       }
//     }),
//   })
// }

// export const getCelestialEvents = async (
//   body: "sun" | "moon",
//   fromDate: string,
//   toDate: string,
//   latitude = 33.775867,
//   longitude = -84.39733,
//   elevation = 0,
// ) => {

//   const queryParams = new URLSearchParams({
//     latitude: latitude.toString(),
//     longitude: longitude.toString(),
//     elevation: elevation.toString(),
//     from_date: fromDate,
//     to_date: toDate,
//     time_zone: "0", // UTC timezone
//     time: "00:00:00" // Add the missing time parameter - midnight UTC
//   }).toString();

//   console.log(queryParams);

//   // Make the request to the events endpoint
//   return fetchFromAstronomyApi(`/bodies/events/${body}?${queryParams}`, {
//     method: "GET",
//   })
// }

