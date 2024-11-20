import axios from "axios";
import { getToken } from "../store/authStore";

interface Review {
  rated: number;
  title: string;
  reviewContent: string;
  typeId: string | undefined;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 리뷰 리스트 가져오기
export const getReviews = async (typeId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews/${typeId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("리뷰 목록을 가져오는 데 실패했습니다.");
    throw error;
  }
};

// 특정 리뷰 가져오기
export const getSpecificReview = async (reviewId: string) => {
  try {
    const token = getToken();
    const response = await axios.get(`/reviews/review/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("특정 리뷰 내용을 가져오는 데 실패했습니다.");
    throw error;
  }
};

// 전체 리뷰 가져오기
export const getAllReviews = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/reviews/all`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("리뷰 목록을 가져오는 데 실패했습니다.");
    throw error;
  }
};

// 리뷰 작성
export const postReview = async ({
  rated,
  title,
  reviewContent,
  typeId,
}: Review) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_BASE_URL}/reviews`,
      {
        rated: rated,
        title: title,
        contents: reviewContent,
        type_id: typeId,
      },
      {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("리뷰 작성에 실패했습니다.");
    throw error;
  }
};

// 리뷰 좋아요
export const likeReview = async (review_id: string) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_BASE_URL}/likes/review`,
      {
        review_id: review_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("리뷰 좋아요에 실패했습니다.");
    throw error;
  }
};

// 리뷰 좋아요 취소
export const unlikeReview = async (review_id: string) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_BASE_URL}/likes/review`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        review_id: review_id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("리뷰 좋아요 취소에 실패했습니다.");
    throw error;
  }
};

// 리뷰 좋아요 눌렀는지 여부 조회
export const whetherLikedReview = async (review_id: string) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${API_BASE_URL}/likes/review/${review_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("리뷰 좋아요 여부 조회에 실패했습니다.");
    throw error;
  }
};

// 댓글 작성
// export const postComment = async (reviewId: string, comment: string) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/review/${reviewId}/comments`,
//       { content: comment },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("댓글 작성에 실패했습니다.");
//     throw error;
//   }
// };
