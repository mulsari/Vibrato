import { useEffect, useState } from "react";
import axios from "axios";

// Artist 타입 정의
interface Artist {
  name: string;
  image_url: string;
  genres?: string[];
  spotify_url: string;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetArtist = (query: string) => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/search/single/artist/${query}`
        );
        setArtist(response.data);
      } catch (error: any) {
        console.error("API error:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchArtist();
    }
  }, [query]);

  return { artist, loading, error };
};

export default useGetArtist;
