import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기

const NoReviews: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white-100">
      <h2 className="text-2xl font-bold text-gray-700">리뷰가 없습니다</h2>
      <p className="text-white-500 mt-2">
        첫 번째 리뷰를 남겨보세요! 당신의 의견을 공유하세요.
      </p>
      <button
        onClick={handleGoBack} // 클릭 시 이전 페이지로 이동
        className="mt-4 px-4 py-2"
        style={{
          backgroundColor: "#C07777",
          color: "#fff",
          borderRadius: "8px",
        }} // 버튼 색상 변경
      >
        리뷰 작성하기
      </button>
    </div>
  );
};

export default NoReviews;
