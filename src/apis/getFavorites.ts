import axios from "axios";

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

interface Artist {
  name: string;
  image_url: string;
  genres?: string[];
  spotify_url: string;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
}

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

export const getFavoriteTracks = async (token: string): Promise<Track[]> => {
  try {
    const response = await axios.get<Track[]>("/selected/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 202) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to fetch favorite tracks", error);
    throw error;
  }
};

export const getFavoriteAlbums = async (token: string): Promise<Album[]> => {
  try {
    const response = await axios.get<Album[]>("/selected/albums", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 202) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to fetch favorite albums", error);
    throw error;
  }
};

export const getFavoriteArtists = async (token: string): Promise<Artist[]> => {
  try {
    const response = await axios.get<Artist[]>("/selected/artists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 202) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to fetch favorite artists", error);
    throw error;
  }
};
