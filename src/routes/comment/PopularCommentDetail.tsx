import { useEffect, useState } from "react";
import spotifyLogo from "../../assets/spotify.png";
import { renderStars } from "../../components/StarRating";
import { getAllReviews } from "../../apis/review";
import { getTypeInfo } from "../../apis/getTypeInfo";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";

interface Comment {
  comment_id: number;
  user_uid: string;
  nickname: string;
  contents: string;
  created_at: string;
  updated_at: string;
  likes: Array<{ id: number; user_uid: number }>;
}

interface ReviewResponse {
  review_id: number;
  nickname: string;
  rated: number;
  title: string;
  contents: string;
  type_id: string;
  created_at: string;
  updated_at: string;
  comments: Comment[];
  likes: Array<{ id: number; user_uid: string }>;
  numOfLikes: number; // 좋아요 수 필드
  liked: boolean;
}

const PopularCommentSection = () => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [likedReviews, setLikedReviews] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [typeData, setTypeData] = useState<{ [key: number]: any }>({}); // 각 리뷰에 대한 타입 데이터를 저장할 상태

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true); // 로딩 시작
        const data = await getAllReviews();
        const sortedData = data.sort((a, b) => b.numOfLikes - a.numOfLikes); // API로 리뷰 데이터 가져오기
        setReviews(sortedData);

        const initialLikedState = data.reduce((acc, review) => {
          acc[review.review_id] = review.liked || false;
          return acc;
        }, {} as { [key: number]: boolean });
        setLikedReviews(initialLikedState); // 초기 좋아요 상태 설정

        // 각 리뷰에 대해 type_id를 이용해 타입 정보를 가져옴
        const typeInfoPromises = data.map((review) =>
          getTypeInfo(review.type_id).then((result) => ({
            reviewId: review.review_id,
            data: result,
          }))
        );

        const resolvedTypeInfos = await Promise.all(typeInfoPromises);
        const newTypeData = resolvedTypeInfos.reduce(
          (acc, { reviewId, data }) => {
            acc[reviewId] = data;
            return acc;
          },
          {} as { [key: number]: any }
        );
        setTypeData(newTypeData); // 가져온 타입 데이터 저장
      } catch (error) {
        setError("리뷰 데이터를 불러오는 데 실패했습니다."); // 에러 처리
        console.error(error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchReviews();
  }, []);

  const toggleLike = (reviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.review_id === reviewId
          ? {
              ...review,
              numOfLikes: likedReviews[reviewId]
                ? review.numOfLikes - 1
                : review.numOfLikes + 1, // 좋아요 개수 증감
            }
          : review
      )
    );
    setLikedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId], // 좋아요 상태 토글
    }));
  };

  const toggleComments = (reviewId: number) => {
    setExpandedComments((prevState) =>
      prevState.includes(reviewId)
        ? prevState.filter((id) => id !== reviewId)
        : [...prevState, reviewId]
    );
  }; // 댓글창 토글

  const handleCommentChange = (reviewId: number, comment: string) => {
    setCommentInputs((prevState) => ({
      ...prevState,
      [reviewId]: comment,
    }));
  };

  const addComment = (reviewId: number) => {
    const newComment = commentInputs[reviewId];
    if (!newComment.trim()) return; // 빈 댓글은 추가하지 않음

    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.review_id === reviewId
          ? {
              ...review,
              comments: [
                ...review.comments,
                {
                  comment_id: Date.now(), // 가상의 ID, 서버와 연동 시 적절히 수정
                  user_uid: "현재 사용자 UID", // 사용자 UID 추가
                  nickname: "현재 사용자 닉네임", // 사용자 닉네임 추가
                  contents: newComment,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  likes: [],
                },
              ],
            }
          : review
      )
    );
    setCommentInputs((prevState) => ({
      ...prevState,
      [reviewId]: "", // 입력창 비우기
    }));
  };

  const renderImage = (reviewId: number) => {
    const typeInfo = typeData[reviewId];
    if (!typeInfo) return <p>데이터를 불러오는 중...</p>;

    const { type, data } = typeInfo;
    switch (type) {
      case "track":
        return (
          <img
            src={data.image_url}
            className="w-40 h-40 object-contain rounded flex-shrink-0 border shadow-md"
            alt="앨범 커버"
          />
        );
      case "album":
        return (
          <img
            src={data.image_url}
            className="w-40 h-40 object-contain rounded flex-shrink-0 border shadow-md"
            alt="앨범 커버"
          />
        );
      case "artist":
        return (
          <img
            src={data.image_url}
            className="w-40 h-40 object-contain rounded flex-shrink-0 border shadow-md"
            alt="앨범 커버"
          />
        );
      default:
        return <p>데이터를 불러오지 못했습니다.</p>;
    }
  };

  const renderTypeData = (reviewId: number, type_id: string) => {
    const typeInfo = typeData[reviewId];
    if (!typeInfo) return <p>데이터를 불러오는 중...</p>;

    const { type, data } = typeInfo;
    switch (type) {
      case "track":
        return (
          <>
            <Link to={`/track/${type_id}`}>
              <h4 className="font-bold text-lg truncate">{data.name}</h4>
            </Link>

            <p className="font-semibold text-gray_dark truncate">
              {data.artist_names.join(", ")}
            </p>
            <p className="font-semibold text-gray_dark">{data.release_date}</p>
            <p className="font-semibold text-gray_dark">
              ★ {data.avg_rated} / 5.0 | 🗎 {data.count_rated}
            </p>
            <div className="mt-4 flex space-x-4">
              <a href={data.spotify_url} target="_blank">
                <img
                  src={spotifyLogo}
                  alt="스포티파이 로고"
                  className="w-8 h-8 rounded-full drop-shadow-md"
                ></img>
              </a>
            </div>
          </>
        );
      case "album":
        return (
          <>
            <Link to={`/album/${type_id}`}>
              <h4 className="font-bold text-lg truncate">{data.name}</h4>
            </Link>
            <p className="font-semibold text-gray_dark truncate">
              {data.artist_names.join(", ")}
            </p>
            <p className="font-semibold text-gray_dark">{data.release_date}</p>
            <p className="font-semibold text-gray_dark">
              ★ {data.avg_rated} / 5.0 | 🗎 {data.count_rated}
            </p>
            <div className="mt-4 flex space-x-4">
              <a href={data.spotify_url} target="_blank">
                <img
                  src={spotifyLogo}
                  alt="스포티파이 로고"
                  className="w-8 h-8 rounded-full drop-shadow-md"
                ></img>
              </a>
            </div>
          </>
        );
      case "artist":
        return (
          <>
            <Link to={`/artist/${type_id}`}>
              <h4 className="font-bold text-lg truncate">{data.name}</h4>
            </Link>
            <p className="font-semibold text-gray_dark">
              ★ {data.avg_rated} / 5.0 | 🗎 {data.count_rated}
            </p>
            <div className="mt-4 flex space-x-4">
              <a href={data.spotify_url} target="_blank">
                <img
                  src={spotifyLogo}
                  alt="스포티파이 로고"
                  className="w-8 h-8 rounded-full drop-shadow-md"
                ></img>
              </a>
            </div>
          </>
        );
      default:
        return <p>데이터를 불러오지 못했습니다.</p>;
    }
  };

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      <section className="col-span-12 p-4 bg-white">
        <a
          href="PopularCommentDetail"
          className="text-2xl font-bold hover:underline hover:decoration-coral hover:decoration-4 hover:underline-offset-8"
        >
          최근 인기 코멘트
        </a>

        <div className="space-y-4 my-4">
          {reviews.slice(0, 10).map((review) => (
            <div
              key={review.review_id}
              className="bg-white shadow-xl p-4 rounded-md border border-gray_border"
            >
              <div className="flex mb-4">
                {renderImage(review.review_id)}
                <div className="ml-4 flex-grow flex flex-col justify-between py-4">
                  {renderStars(review.rated)} {/* 별점 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-10 h-10 rounded-full bg-coral border shadow-md"></span>
                      <h3 className="font-bold text-lg ml-2">
                        {review.nickname}
                      </h3>
                    </div>
                    <span className="text-sm text-gray_dark mr-2">
                      {new Date(review.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4 flex">
                <div className="flex flex-col w-40">
                  {renderTypeData(review.review_id, review.type_id)}
                  {/* 트랙, 앨범, 아티스트 정보 렌더링 */}
                </div>
                <div className="ml-4 flex-grow">
                  <h2 className="font-bold text-lg mb-2 ml-2">
                    {review.title}
                  </h2>
                  <p className="font-semibold text-gray_dark ml-2">
                    {review.contents}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex">
                <div className="flex items-center mr-8">
                  <button
                    className={`text-lg font-bold ${
                      likedReviews[review.review_id]
                        ? "text-coral"
                        : "text-gray_dark"
                    }`}
                    onClick={() => toggleLike(review.review_id)}
                  >
                    좋아요 👍︎ {review.numOfLikes}
                  </button>
                </div>
                <div className="flex items-center">
                  <button
                    className="text-lg font-bold text-gray_dark"
                    onClick={() => toggleComments(review.review_id)}
                  >
                    댓글 🗨️ {review.comments.length}
                  </button>
                </div>
              </div>
              {expandedComments.includes(review.review_id) && (
                <div className="mt-4 p-4 bg-gray_light rounded-md">
                  {review.comments.length > 0 ? (
                    review.comments.map((comment, index) => (
                      <div className="flex" key={index}>
                        <h2 className="text-sm px-2 w-40 truncate">
                          {comment.nickname}
                        </h2>
                        <p className="text-sm px-2 text-gray_dark flex-grow">
                          {comment.contents}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm px-4 text-gray_dark">
                      코멘트가 없습니다.
                    </p>
                  )}

                  <div className="flex mt-4">
                    <input
                      type="text"
                      value={commentInputs[review.review_id] || ""}
                      onChange={(e) =>
                        handleCommentChange(review.review_id, e.target.value)
                      }
                      className="mt-2 px-4 py-2 mr-2 flex-grow text-sm rounded-md"
                      placeholder="코멘트를 입력하세요"
                    />
                    <button
                      onClick={() => addComment(review.review_id)}
                      className="mt-2 px-4 py-2 bg-coral text-white rounded-md text-sm"
                    >
                      코멘트 추가
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopularCommentSection;
