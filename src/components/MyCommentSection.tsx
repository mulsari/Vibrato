import React from "react";

const MyCommentSection: React.FC = () => {
  // 하드 코딩된 데이터
  const comments = [
    {
      id: 1,
      user_nickname: "닉네임1",
      user_pic_url: "https://loremflickr.com/320/240?random=1",
      title: "코멘트 1",
      content: "앨범 좋음!",
      rated: 5,
      created_at: "10시간 전",
      likes: 12,
      replies: 3,
    },
    {
      id: 2,
      user_nickname: "닉네임2",
      user_pic_url: "https://loremflickr.com/320/240?random=2",
      title: "코멘트 2",
      content: "그냥 그럼",
      rated: 3,
      created_at: "2시간 전",
      likes: 5,
      replies: 1,
    },
    {
      id: 3,
      user_nickname: "닉네임3",
      user_pic_url: "https://loremflickr.com/320/240?random=3",
      title: "코멘트 3",
      content: "최고의 명작",
      rated: 5,
      created_at: "30분 전",
      likes: 2,
      replies: 0,
    },
  ];

  return (
    <section className="col-span-4">
      {/* 3. 코멘트 섹션 */}
      <div className="flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">내가 작성한 코멘트</h2>
          <button className="text-gray_dark hover:text-coral">더보기</button>
        </div>
        {/* 코멘트 내용 */}
        {comments.map((replies) => (
          <div className="border border-gray_border p-4 rounded-lg mt-4 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <span className="w-8 h-8 rounded-full bg-coral"></span>
                <p className="text-lg font-bold">{replies.user_nickname}</p>
              </div>
              <p className="text-sm text-gray_dark font-bold mr-2">
                {replies.title}
              </p>
            </div>
            <hr className="my-2 shadow" />
            <p className="mx-2 text-lg font-bold">{replies.title}</p>
            <p className="mx-2 text-gray_dark font-semibold">
              {replies.content}
            </p>
            <span className="m-2 font-bold">★ {replies.rated} / 5.0</span>
            <div className="mt-4 flex">
              <div className="flex items-center mr-8 text-gray_dark">
                <button className="font-bold">
                  좋아요 👍︎ {replies.likes}
                </button>
              </div>
              <div className="flex items-center">
                <button className="font-bold text-gray_dark">
                  댓글 🗨️ {replies.replies}
                </button>
                {/* 댓글 버튼 누르면 댓글창 토글되게 코드 추가 필요 */}
              </div>
              <div className="flex-grow"></div>
              <button className="text-gray_dark underline text-sm mr-4 mt-2">
                수정
              </button>
              <button className="text-gray_dark underline text-sm mt-2">
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyCommentSection;
