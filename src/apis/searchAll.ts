import { useEffect, useState } from "react";
import axios from "axios";

// Artist 타입 정의
interface Artist {
  name: string;
  id: string;
  image_url: string;
  spotify_url: string;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
  genres?: string[];
}

// Album 타입 정의
interface Album {
  name: string;
  id: string;
  artists_name: string[];
  album_artists: {
    id: string;
    name: string;
    spotify_url: string;
    count_rated: number;
    liked: boolean;
  }[];
  spotify_url: string;
  image_url: string;
  total_tracks: number;
  release_date: string;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
}

// Track 타입 정의
interface Track {
  name: string;
  id: string;
  artists_name: string[];
  image_url: string;
  spotify_url: string;
  preview?: string;
  album_id: string;
  album_name: string;
  release_date: string;
  duration: number;
  album_spotify_url: string;
  album_artists: {
    id: string;
    name: string;
    spotify_url: string;
    count_rated?: number;
    liked?: boolean;
  }[];
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 전체 검색
export const useSearchAll = (searchContent: string) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/search/all/${searchContent}`
        );

        const { artists, albums, tracks } = response.data;

        setArtists(Array.isArray(artists) ? artists : []);
        setAlbums(Array.isArray(albums) ? albums : []);
        setTracks(Array.isArray(tracks) ? tracks : []);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchContent) {
      fetchSearchResults();
    }
  }, [searchContent]);

  return { artists, albums, tracks, loading, error };
};

// 트랙 검색
export const useSearchTracks = (searchContent: string) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/search/tracks/${searchContent}`
        );

        const { tracks } = response.data;

        setTracks(Array.isArray(tracks) ? tracks : []);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchContent) {
      fetchSearchResults();
    }
  }, [searchContent]);

  return { tracks, loading, error };
};

// 아티스트 검색
export const useSearchArtists = (searchContent: string) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/search/artists/${searchContent}`
        );

        const { artists } = response.data;

        setArtists(Array.isArray(artists) ? artists : []);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchContent) {
      fetchSearchResults();
    }
  }, [searchContent]);

  return { artists, loading, error };
};

// 앨범 검색
export const useSearchAlbums = (searchContent: string) => {
  const [albums, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/search/albums/${searchContent}`
        );

        const { albums } = response.data;

        setTracks(Array.isArray(albums) ? albums : []);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchContent) {
      fetchSearchResults();
    }
  }, [searchContent]);

  return { albums, loading, error };
};
