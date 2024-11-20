import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReviews, likeReview, unlikeReview, whetherLikedReview } from "../../apis/review";
import NoReviews from "../../components/NoReviews";
// import { getTypeInfo } from "../../apis/getTypeInfo";

interface ReviewList {
  review_list: Review[];
}

interface Review {
  review_id: number;
  user_uid: string;
  rated: number;
  title: string;
  contents: string;
  type_id: string;
  created_at: string;
  updated_at: string;
  comments: Comment[];
  likes: Like[];
}

interface Comment {
  comment_id: number;
  user_uid: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface Like {
  user_uid: string;
  liked_at: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewList | null>(null);
  const [sortOrder, setSortOrder] = useState<"인기순" | "추천순" | "최신순">(
    "인기순"
  );
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const navigate = useNavigate();
  const { typeID } = useParams();
  const [likedReviews, setLikedReviews] = useState<{ [key: string]: boolean }>({});
  const [likesCount, setLikesCount] = useState<{ [key: string]: number }>({});
//   const [paramType, setParamType] = useState

  const handleCommentClick = (reviewID: string) => {
    navigate(`/Review/${reviewID}/Comments`);
  };

//   if (typeID) {
//     const paramType = getTypeInfo(typeID);
//     console.log(paramType.data, paramType.type);
//   }

  useEffect(() => {
    const fetchReviews = async () => {
      if (typeID) {
        try {
          const reviewsData = await getReviews(typeID);
          setReviews(reviewsData);

          // 초기 좋아요 수 설정
          const initialLikesCount = reviewsData.reduce((acc: any, review: Review) => {
            acc[review.review_id] = review.likes.length;
            return acc;
          }, {});
          setLikesCount(initialLikesCount);

        } catch (error) {
          console.error("리뷰 데이터를 가져오는 중 에러 발생:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReviews();
  }, [typeID]);

  useEffect(() => {
    const fetchLikedStatus = async () => {
      const likedStatusPromises = reviews.map(async (review) => {
        const liked = await whetherLikedReview(review.review_id);
        return { review_id: review.review_id, liked };
      });

      const likedStatuses = await Promise.all(likedStatusPromises);
      const likedMap = likedStatuses.reduce((acc, { review_id, liked }) => {
        acc[review_id] = liked;
        return acc;
      }, {});

      setLikedReviews(likedMap);
    };

    fetchLikedStatus();
  }, [reviews]);

  const handleLikeToggle = async (review_id: string) => {
    const isLiked = likedReviews[review_id];
    console.log("isliked: ", isLiked);

    if (isLiked) {
      await unlikeReview(review_id);
      setLikesCount((prevState) => ({
        ...prevState,
        [review_id]: prevState[review_id] - 1,
      }));
    } else {
      await likeReview(review_id);
      setLikesCount((prevState) => ({
        ...prevState,
        [review_id]: prevState[review_id] + 1,
      }));
    }

    setLikedReviews((prevState) => ({
      ...prevState,
      [review_id]: !isLiked,
    }));
  };

  const convertToKST = (dateString: string): string => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 9); // 한국 시간으로 변환
    return date.toLocaleString();
  };

  if (loading) {
    return <div>Loading...</div>; // 데이터 로딩 중일 때
  }

  return (
    <div className="p-4">
      {reviews ? (
        <div className="container mx-auto grid-cols-12 px-5 gap-10">
          <h1 className="text-3xl font-bold">리뷰</h1>

          {/* 정렬 버튼 */}
          <div className="flex justify-end mb-4">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="border p-2 rounded"
            >
              <option value="인기순">인기순</option>
              <option value="추천순">추천순</option>
              <option value="최신순">최신순</option>
            </select>
          </div>

          {/* 리뷰 리스트 */}
          {reviews.map((review) => (
            <div
              key={review.review_id}
              className="border p-4 rounded-lg mb-4 flex items-start"
              onClick={() => handleCommentClick(review.review_id)}
            >
              <div className="flex flex-col w-full cursor-pointer">
                <div className="flex justify-between">
                  <p className="text-xl font-bold">{review.title}</p>
                  <p className="text-yellow-500">★ {review.rated}</p>
                </div>
                <div className="flex items-center mt-4">
                  <span className="w-5 h-5 rounded-full bg-light_coral"></span>
                  <p className="text-m ml-2 font-bold">{review.nickname}</p>
                </div>
                <p className="text-xs mt-2">
                  {convertToKST(review.created_at)}
                </p>
                <p className="mt-2">{review.contents}</p>

                <div className="flex items-center mt-4">
                  <button className={`text-blue-500 flex items-center ${likedReviews[review.review_id] ? 'text-blue-500' : 'text-gray-500'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLikeToggle(review.review_id)
                        }}
                  >
                    <span>👍 좋아요</span>
                     <span className="ml-2">{likesCount[review.review_id]}</span>
                  </button>
                  <button className="ml-4 text-blue-500 flex items-center">
                    <span>💬 댓글</span>
                    <span className="ml-2">{review.comments.length}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoReviews /> // 리뷰가 없을 때 NoReviews 컴포넌트 사용
      )}
    </div>
  );
};

export default Reviews;
