import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReviews } from "../apis/review";
import NoReviewBox from "./NoRewiewBox";

interface TypeId {
  typeID: string | undefined;
}

const ReviewSection: React.FC<TypeId> = ({ typeID }: TypeId) => {
  const [reviews, setReviews] = useState<any[]>([]); // 리뷰 데이터를 상태로 관리
  const [likedComments, setLikedComments] = useState<{
    [key: number]: boolean;
  }>({});
  const [expandedComments, setExpandedComments] = useState<{
    [key: number]: boolean;
  }>({});

  const navigate = useNavigate();

  // 비동기 함수 호출을 useEffect 내에서 처리
  useEffect(() => {
    if (typeID) {
      const fetchReviews = async () => {
        try {
          const reviewsData = await getReviews(typeID); // API 호출
          setReviews(reviewsData); // 받아온 데이터 상태에 저장
        } catch (error) {
          console.error("리뷰를 가져오는 데 실패했습니다.", error);
        }
      };

      fetchReviews(); // 컴포넌트 마운트 시 API 호출
    }
  }, [typeID]); // typeID가 변경될 때마다 다시 호출

  const handleMoreClick = () => {
    navigate(`/Review/${typeID}`);
  };

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const createdAt = new Date(dateString);

    const adjustedCreatedAt = new Date(createdAt.getTime() + 9 * 3600 * 1000);

    const diff = Math.floor(
      (now.getTime() - adjustedCreatedAt.getTime()) / 1000
    );

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor(diff / 60);

    if (hours < 1) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}일 전`;
    }
  };

  // 좋아요 토글 함수
  const toggleLike = (id: number) => {
    setLikedComments((prevLikedComments) => ({
      ...prevLikedComments,
      [id]: !prevLikedComments[id],
    }));
  };

  // 댓글창 토글 함수
  const toggleReplySection = (id: number) => {
    setExpandedComments((prevExpandedComments) => ({
      ...prevExpandedComments,
      [id]: !prevExpandedComments[id],
    }));
  };

  return (
    <section className="col-span-4">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">리뷰</h2>
          <button
            className="text-gray_dark hover:text-coral"
            onClick={handleMoreClick}
          >
            더보기
          </button>
        </div>

        {/* 리뷰 데이터가 있을 경우 출력 */}
        {reviews.length > 0 ? (
          reviews.slice(0, 3).map((review) => {
            const isLiked = likedComments[review.id] || false;
            const isExpanded = expandedComments[review.id] || false;
            return (
              <div
                key={review.id}
                className="border border-gray_border p-4 rounded-lg mt-4 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="w-8 h-8 rounded-full bg-light_coral"></span>
                    <p className="text-lg font-bold">{review.nickname}</p>
                  </div>
                  <p className="text-sm text-gray_dark font-bold mr-2">
                    {timeAgo(review.created_at)}
                  </p>
                </div>
                <hr className="my-2 shadow" />
                <p className="mx-2 mb-2 text-lg font-bold">{review.title}</p>
                <p className="mx-2 mb-2 text-gray_dark font-semibold">
                  {review.contents}
                </p>
                <span className="m-2 font-bold">★ {review.rated} / 5.0</span>
                <div className="mt-4 flex">
                  {/* 좋아요 버튼 */}
                  <div className="flex items-center mr-8 text-gray_dark truncate">
                    <button
                      className={`font-bold ${
                        isLiked ? "text-coral" : "text-gray_dark"
                      }`}
                      onClick={() => toggleLike(review.id)}
                    >
                      좋아요
                      <span className="ml-1 mr-1">👍︎</span>
                      {isLiked ? review.likes + 1 : review.likes}
                    </button>
                  </div>
                  {/* 댓글 버튼 */}
                  <div className="flex items-center">
                    <button
                      className="font-bold text-gray_dark"
                      onClick={() => toggleReplySection(review.id)}
                    >
                      댓글 🗨️ {review.replies}
                    </button>
                  </div>
                </div>
                {/* 댓글창 */}
                {isExpanded && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-md">
                    <p className="text-sm text-gray_dark">댓글이 없습니다.</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <NoReviewBox />
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
