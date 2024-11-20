import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAlbumInfo = async (albumId: string) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/search/single/album/${albumId}`
    );

    // console.log("response", response);
    console.log("response data", response.data);

    return response.data;
  } catch (error) {
    console.error("앨범 정보를 불러오지 못했습니다:", error);
    throw error;
  }
};
