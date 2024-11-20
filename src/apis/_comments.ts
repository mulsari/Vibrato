import axios from "axios";

// Review 관련 타입 정의
export interface Comment {
  comment_id: number;
  user_uid: string;
  contents: string;
  created_at: string;
  updated_at: string;
  likes: any[];
}

export interface Like {
  id: number;
  user_uid: {
    id: number;
    uid: string;
    profileImage: string;
    nickname: string;
    created_at: string;
  };
}

export interface ReviewResponse {
  review_id: number;
  user_uid: string;
  rated: number;
  contents: string;
  type_id: string;
  created_at: string;
  updated_at: string;
  comments: Comment[];
  likes: Like[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 리뷰 데이터를 불러오는 API 함수
export const fetchReviews = async (
  type_id: string
): Promise<ReviewResponse[]> => {
  try {
    const response = await axios.get<ReviewResponse[]>(
      `${API_BASE_URL}/reviews/${type_id}`
    );
    return response.data;
  } catch (error) {
    console.error("리뷰 데이터를 불러오는 중 오류가 발생했습니다.", error);
    throw error;
  }
};
