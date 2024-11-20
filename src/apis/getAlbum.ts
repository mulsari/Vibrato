import { useEffect, useState } from "react";
import axios from "axios";

// Album 타입 정의
interface Album {
  name: string;
  image_url: string;
  artist_names: string[];
  genres?: string[];
  release_date: string;
  total_tracks: number[];
  spotify_url: string;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
  tracks: {
    id: string;
    name: string;
    spotify_url: string;
    track_number: number;
    liked?: boolean;
  };
  artist: {
    id: string;
    name: string;
    spotify_url: string;
    liked: boolean;
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAlbum = (query: string) => {
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        console.log(`Fetching track for query: ${query}`);

        const response = await axios.put(
          `${API_BASE_URL}/search/single/album/${query}`
        );

        console.log("API Response:", response.data);

        setAlbum(response.data);
      } catch (error: any) {
        console.error("API error:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchAlbum();
    }
  }, [query]);

  return { album, loading, error };
};

export default useGetAlbum;
