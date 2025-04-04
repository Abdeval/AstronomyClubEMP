import { useAstroBodies, useAstroBody, useAstroEvents } from "@/hooks";
import { format, addYears } from "date-fns";

const Events = () => {
  const today = new Date();
  const fromDate = format(today, "yyyy-MM-dd");
  const toDate = format(addYears(today, 2), "yyyy-MM-dd");

  const latitude = 35.980821; // Kheir Eddine by default
  const longitude = 0.169862;

  // For a single body
  const { data: bodies } = useAstroBodies({
    fromDate: "2025-04-04",
    toDate: "2025-05-04", // Will be limited to 30 days max
    latitude: 40.7128,
    longitude: -74.006,
    elevation: 0,
  });

  const { data: mars } = useAstroBody({
    body: "mars",
    fromDate: "2025-04-04",
    toDate: "2025-05-04", // Will be limited to 30 days max
    latitude: 40.7128,
    longitude: -74.006,
    elevation: 0,
  });


  console.log("mars", mars);
  console.log("bodies: ", bodies);

  const { data: moonEvents, isLoading } = useAstroEvents({
    body: "moon",
    fromDate,
    toDate,
    latitude,
    longitude,
    elevation: 0,
  });

  // console.log(moonEvents?.data.rows);

  // const events = moonEvents && moonEvents.data.table.rows[0].cells[0].type;
  // console.log(moonEvents);

  return isLoading ? <p>loading...</p> : <div>{}</div>;
};

export default Events;
