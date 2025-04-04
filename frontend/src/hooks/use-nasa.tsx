import { getNasaApi } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const useNasaDailyImage = () => {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    const res = useQuery({
        queryKey: ["nasa-daily-image"],
        queryFn: () => getNasaApi(`/planetary/apod?api_key=${NASA_KEY}`)
    });

    return res;
}