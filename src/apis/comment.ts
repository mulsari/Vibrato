import axios from "axios";
import { getToken } from "../store/authStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface PostComment {
    reviewId: number | undefined;
    comment: string;
}

interface LikeComment {
    review_id: number;
    comment_id: number;
}

// 리뷰에 대한 전체 코멘트 불러오기
export const getComments = async (reviewID: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/review/${reviewID}/comments`
    );
    console.log("리뷰에 대한 전체 댓글 가져오기 성공");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("리뷰에 대한 전체 댓글을 가져오는 데 실패했습니다.");
    throw error;
  }
};

// 댓글 작성
export const postComment = async ({reviewId, comment}: PostComment) => {
    const token = getToken();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/review/${reviewId}/comments`,
        { contents: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("댓글 작성에 실패했습니다.");
      throw error;
    }
};


// 댓글 좋아요
export const likeComment = async ({review_id, comment_id}: LikeComment) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${API_BASE_URL}/likes/review/comment`,
        {
          review_id: review_id,
          comment_id: comment_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("댓글 좋아요에 실패했습니다.");
      throw error;
    }
};

// 댓글 좋아요 취소
export const unlikeComment= async ({review_id, comment_id}: LikeComment) => {
    try {
      const token = getToken();
      const response = await axios.delete(
        `${API_BASE_URL}/likes/review/comment`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            review_id: review_id,
            comment_id: comment_id
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("댓글 좋아요 취소에 실패했습니다.");
      throw error;
    }
};

// 댓글 좋아요 눌렀는지 여부 조회
export const whetherLikedComment = async ({review_id, comment_id}: LikeComment) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${API_BASE_URL}/likes/review/${review_id}/comment/${comment_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("댓글 좋아요 여부 조회에 실패했습니다.");
      throw error;
    }
};
  