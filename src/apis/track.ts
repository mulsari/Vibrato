import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTrackInfo = async (trackId: string) => {
  try {
    const response = await axios.put(`/search/single/track/${trackId}`);
    return response.data;
  } catch (error) {
    console.error("트랙 정보를 불러오지 못했습니다:", error);
    throw error;
  }
};
