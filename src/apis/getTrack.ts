import { useEffect, useState } from "react";
import axios from "axios";

// Track 타입 정의
interface Track {
  name: string;
  image_url: string;
  artist_names: string[];
  release_date: string;
  spotify_url: string;
  track_number: number;
  duration: number;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
  preview?: string;
  album: {
    id: number;
    name: string;
    spotify_url: string;
    avg_rated?: number;
    liked?: boolean;
  };
  artists: {
    id: string;
    name: string;
    spotify_url: string;
    liked?: boolean;
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetTrack = (query: string) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        console.log(`Fetching track for query: ${query}`);

        const response = await axios.put(
          `${API_BASE_URL}/search/single/track/${query}`
        );

        console.log("API Response:", response.data);

        setTrack(response.data);
      } catch (error: any) {
        console.error("API error:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchTrack();
    }
  }, [query]);

  return { track, loading, error };
};

export const useGetRestTrack = (query: string) => {
  const [restTrack, setRestTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        console.log(`Fetching track for query: ${query}`);

        const response = await axios.put(`${API_BASE_URL}/search/rest/tracks`, {
          type_id: query,
        });

        console.log("API Response:", response.data);

        setRestTrack(response.data);
      } catch (error: any) {
        console.error("API error:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchTrack();
    }
  }, [query]);

  return { restTrack, loading, error };
};
