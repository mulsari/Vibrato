import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const mockComments = [
  {
    id: 1,
    artistName: "아이유",
    profileImage: "https://picsum.photos/50/50",
    rating: 4.5,
    commentContent: "이 아티스트 너무 좋아요!",
    timeAgo: "10시간 전",
    likes: 15,
    commentsCount: 3,
    userProfile: "https://picsum.photos/30/30",
  },
];

const ArtistComment = () => {
  const [comments, setComments] = useState(mockComments);
  const [sortOrder, setSortOrder] = useState<"인기순" | "추천순" | "최신순">(
    "인기순"
  );
  const navigate = useNavigate();

  const handleCommentClick = () => {
    navigate("/artistCommentDetail", { state: { comment: mockComments } });
  };

  useEffect(() => {
    const sortedComments = [...comments].sort((a, b) => {
      if (sortOrder === "인기순") {
        return b.commentsCount - a.commentsCount;
      } else if (sortOrder === "추천순") {
        return b.likes - a.likes;
      } else if (sortOrder === "최신순") {
        return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime();
      }
      return 0;
    });
    setComments(sortedComments);
  }, [sortOrder]);

  const handleLike = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const toggleComments = (commentId: number) => {
    console.log(`댓글 보기 토글, 코멘트 ID: ${commentId}`);
  };

  return (
    <div className="p-4">
      {/* 1. 아티스트 이름 */}
      {comments.length > 0 && (
        <h1 className="text-3xl font-bold">
          {`${comments[0].artistName}에 대한 코멘트`}
        </h1>
      )}

      {/* 2. 정렬 버튼 */}
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

      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border p-4 rounded-lg mb-4 flex items-start"
        >
          {/* 3. 아티스트 이미지 */}
          <img
            src={comment.profileImage}
            alt={comment.artistName}
            className="w-20 h-20 mr-4"
          />

          {/* 4. 아티스트 별점 */}
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <p className="text-xl font-bold">{comment.artistName}</p>
              <p className="text-yellow-500">★ {comment.rating}</p>
            </div>

            {/* 5. 코멘트 남긴 사람의 프로필 */}
            <div className="flex items-center mt-2">
              <img
                src={comment.userProfile}
                alt="User"
                className="w-10 h-10 rounded-full mr-2"
              />
              <p>{comment.timeAgo}</p>
            </div>

            {/* 8. 코멘트 내용 */}
            <p className="mt-2" onClick={handleCommentClick}>
              {comment.commentContent}
            </p>

            {/* 9. 좋아요 버튼과 좋아요 수 */}
            <div className="flex items-center mt-4">
              <button
                className="text-blue-500 flex items-center"
                onClick={() => handleLike(comment.id)}
              >
                <span>👍</span>
                <span className="ml-2">{comment.likes}</span>
              </button>

              {/* 10. 댓글 버튼과 댓글 수 */}
              <button
                className="ml-4 text-blue-500 flex items-center"
                onClick={() => toggleComments(comment.id)}
              >
                <span>💬 댓글</span>
                <span className="ml-2">{comment.commentsCount}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistComment;
