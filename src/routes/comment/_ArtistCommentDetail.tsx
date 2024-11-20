import { useState } from "react";

const mockCommentDetail = {
  id: 1,
  artistName: "아이유",
  profileImage: "https://via.placeholder.com/50",
  rating: 4.5,
  commentContent: "이 아티스트 너무 좋아요!",
  timeAgo: "10시간 전",
  likes: 417,
  repliesCount: 4,
  replies: [
    {
      id: 1,
      username: "BM",
      content: "인터넷방송 댓글 주르륵 올라오는 연출 이제 너무 B급 같다",
      likes: 69,
      timeAgo: "6일 전",
    },
    {
      id: 2,
      username: "무채색",
      content: "첫 코멘트부터 매콤하네요.",
      likes: 1,
      timeAgo: "7일 전",
    },
    {
      id: 3,
      username: "건장한깡커류",
      content: "인정...",
      likes: 0,
      timeAgo: "5일 전",
    },
    {
      id: 4,
      username: "MYUN",
      content: "트렌디함을 티내야하기 때문에 그건 안됩니다.",
      likes: 0,
      timeAgo: "1일 전",
    },
  ],
};

const ArtistCommentDetail = () => {
  const [comment, setComment] = useState(mockCommentDetail);
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState(comment.replies);

  const handleLikeComment = () => {
    setComment((prevComment) => ({
      ...prevComment,
      likes: prevComment.likes + 1,
    }));
  };

  const handleLikeReply = (replyId: number) => {
    setReplies((prevReplies) =>
      prevReplies.map((reply) =>
        reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
      )
    );
  };

  const handleAddReply = () => {
    if (newReply.trim() === "") return;

    const newReplyData = {
      id: replies.length + 1,
      username: "새로운 유저",
      content: newReply,
      likes: 0,
      timeAgo: "방금 전",
    };

    setReplies([newReplyData, ...replies]);
    setNewReply("");
  };

  return (
    <div className="p-4">
      {/* 코멘트 상세 페이지 */}
      <div className="border p-4 rounded-lg mb-4">
        <div className="flex items-start">
          {/* 프로필 이미지 */}
          <img
            src={comment.profileImage}
            alt={comment.artistName}
            className="w-20 h-20 mr-4"
          />

          <div className="flex flex-col w-full">
            {/* 아티스트 이름 및 평점 */}
            <div className="flex justify-between">
              <p className="text-xl font-bold">{comment.artistName}</p>
              <p className="text-gray-500">{comment.timeAgo}</p>
            </div>

            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-2">★ {comment.rating}</span>
            </div>

            {/* 코멘트 내용 */}
            <p>{comment.commentContent}</p>

            {/* 좋아요 및 댓글 수 */}
            <div className="flex items-center mt-4">
              <button
                className="text-blue-500 flex items-center"
                onClick={handleLikeComment}
              >
                👍 좋아요
                <span className="ml-2">{comment.likes}</span>
              </button>
              <span className="ml-4 text-blue-500 flex items-center">
                💬 댓글
                <span className="ml-2">{comment.repliesCount}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 리스트 */}
      {replies.map((reply) => (
        <div key={reply.id} className="border p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <p className="font-bold">{reply.username}</p>
            <p className="text-gray-500">{reply.timeAgo}</p>
          </div>
          <p>{reply.content}</p>
          <div className="flex items-center mt-2">
            <button
              className="text-blue-500 flex items-center"
              onClick={() => handleLikeReply(reply.id)}
            >
              👍 좋아요
              <span className="ml-2">{reply.likes}</span>
            </button>
          </div>
        </div>
      ))}

      {/* 댓글 작성 섹션 */}
      <div className="mt-4">
        <textarea
          className="border p-2 w-full rounded mb-2"
          placeholder="댓글을 작성하세요..."
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleAddReply}
        >
          댓글 달기
        </button>
      </div>
    </div>
  );
};

export default ArtistCommentDetail;
