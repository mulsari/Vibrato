import React from "react";

const NoReviewBox: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white-100">
      <h2 className="text-xl font-bold text-gray-700">리뷰가 없습니다</h2>
      <p className="text-gray-500 mt-2">
        첫 번째 리뷰를 남겨보세요! 당신의 의견을 공유하세요.
      </p>
    </div>
  );
};

export default NoReviewBox;
