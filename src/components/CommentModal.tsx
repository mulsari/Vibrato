import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { StarRating } from "./StarRating";
import logo from "../assets/Logo.png";
import { postReview } from "../apis/review";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  userRating: number;
  Image: string;
  Title: string;
  SubTitle: string;
  TypeID: string | undefined;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userRating,
  Image,
  Title,
  SubTitle,
  TypeID,
}) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(userRating);
  const { isLoggedIn } = useAuthStore();
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    console.log(`User Rating: ${rating}`);
  };

  // 리뷰 작성 함수
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!comment.trim()) {
      alert("본문을 입력해주세요.");
      return;
    }
    if (rating === 0) {
      alert("별점을 입력해주세요.");
      return;
    }

    try {
      // 리뷰 작성 API 호출
      console.log(rating, title, comment, TypeID)
      await postReview({rated: rating, title: title, reviewContent: comment, typeId: TypeID})
      alert("리뷰 작성에 성공했습니다!");
      setTitle("");
      setComment("");
      onClose(); // 모달 닫기
    } catch (error) {
      console.error(error);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      setIsFading(true);

      const timer = setTimeout(() => {
        setIsFading(false); // 페이드아웃 시작
      }, 1000); // 1초 대기 후 페이드아웃

      const closeTimer = setTimeout(() => {
        setShowLoginAlert(false); // 알림 창 닫기
        if (onClose) onClose(); // onClose 콜백 호출
      }, 1500); // 페이드아웃 후 0.5초 뒤에 창 닫음

      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer); // 두 타이머 모두 정리
      };
    }
  }, [isLoggedIn, onClose]);

  return (
    <div>
      {isLoggedIn ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-7">
              리뷰 작성하기
            </h2>
            <div className="flex items-center mb-6">
              <img
                src={Image}
                alt="앨범 커버"
                className="w-16 h-16 rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-black">
                  {Title}
                </h3>
                <p className="text-sm text-gray_dark">{SubTitle}</p>
              </div>
            </div>
            <div className="size-1/2 mb-4">
              <StarRating initialRating={rating} onRate={handleRatingChange} />
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2" htmlFor="title">
                제목
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray_border rounded-lg focus:outline-none"
                placeholder="제목을 입력하세요"
              />
            </div>
            <div className="mb-6">
              <label className="block text-black mb-2" htmlFor="comment">
                본문
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray_border rounded-lg focus:outline-none"
                rows={5}
                placeholder="본문을 입력하세요"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit} // 수정된 부분: 작성 버튼 클릭 시 handleSubmit 호출
                className="bg-coral text-white py-2 px-6 rounded-md mr-3"
              >
                작성
              </button>
              <button
                onClick={onClose}
                className="bg-gray_dark text-white py-2 px-6 rounded-md"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {showLoginAlert && (
            <div
              className={`bg-white p-6 rounded-lg shadow-lg w-72 flex flex-col text-center items-center transition-opacity duration-500 ease-in-out ${
                isFading ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={logo} alt="Logo" className="w-24 h-auto mb-5 mx-auto" />
              <p>로그인이 필요한 기능입니다.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentModal;





// import React, { useState, useEffect } from "react";
// import { useAuthStore } from "../store/authStore";
// import { StarRating } from "./StarRating";
// import logo from "../assets/Logo.png";

// interface CommentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   // onSubmit: (title: string, comment: string, rating: number) => void;
//   onSubmit: () => void;
//   userRating: number;
//   albumImage: string;
//   albumTitle: string;
//   artistName: string;
// }

// const CommentModal: React.FC<CommentModalProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   userRating,
//   albumImage,
//   albumTitle,
//   artistName,
// }) => {
//   const [title, setTitle] = useState("");
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(userRating);
//   const { isLoggedIn } = useAuthStore();
//   const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);
//   const [isFading, setIsFading] = useState<boolean>(false);

//   const handleRatingChange = (newRating: number) => {
//     setRating(newRating);
//     console.log(`User Rating: ${rating}`);
//   };

//   // const onSubmit = (rated: rating, title: title, reviewContent: comment, albumId: strin) => {
    
//   // }

//   const handleSubmit = () => {
//     if (!title.trim()) {
//       alert("제목을 입력해주세요.");
//       return;
//     }
//     if (!comment.trim()) {
//       alert("본문을 입력해주세요.");
//       return;
//     }
//     if (rating === 0) {
//       alert("별점을 입력해주세요.");
//       return;
//     }
//     // onSubmit(title, comment, rating);
//     onSubmit();
//     setTitle("");
//     setComment("");
//     onClose();
//   };

//   useEffect(() => {
//     if (!isLoggedIn) {
//       setShowLoginAlert(true);
//       setIsFading(true);

//       const timer = setTimeout(() => {
//         setIsFading(false); // 페이드아웃 시작
//       }, 1000); // 1초 대기 후 페이드아웃

//       const closeTimer = setTimeout(() => {
//         setShowLoginAlert(false); // 알림 창 닫기
//         if (onClose) onClose(); // onClose 콜백 호출
//       }, 1500); // 페이드아웃 후 0.5초 뒤에 창 닫음

//       return () => {
//         clearTimeout(timer);
//         clearTimeout(closeTimer); // 두 타이머 모두 정리
//       };
//     }
//   }, [isLoggedIn, onClose]);

//   return (
//     <div>
//       {isLoggedIn ? (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//               코멘트 작성하기
//             </h2>
//             <div className="flex items-center mb-6">
//               <img
//                 src={albumImage}
//                 alt="앨범 커버"
//                 className="w-16 h-16 rounded-lg mr-4"
//               />
//               <div>
//                 <h3 className="text-lg font-semibold text-black">
//                   {albumTitle}
//                 </h3>
//                 <p className="text-sm text-gray_dark">
//                   {artistName}
//                 </p>
//               </div>
//               {/* <p className="ml-auto text-gray_dark text-sm">
//                 ★ avg.rated / 5.0 | 🗎 count.rated
//               </p> */}
//             </div>
//             <div className="size-1/2 mb-4">
//               <StarRating initialRating={rating} onRate={handleRatingChange} />
//             </div>

//             <div className="mb-4">
//               <label className="block text-black mb-2" htmlFor="title">
//                 제목
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full p-3 border border-gray_border rounded-lg focus:outline-none"
//                 placeholder="제목을 입력하세요"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-black mb-2" htmlFor="comment">
//                 본문
//               </label>
//               <textarea
//                 id="comment"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 className="w-full p-3 border border-gray_border rounded-lg focus:outline-none"
//                 rows={5}
//                 placeholder="본문을 입력하세요"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={handleSubmit}
//                 className="bg-coral text-white py-2 px-6 rounded-md mr-3"
//               >
//                 작성
//               </button>
//               <button
//                 onClick={onClose}
//                 className="bg-gray_dark text-white py-2 px-6 rounded-md"
//               >
//                 취소
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           {showLoginAlert && (
//             <div
//               className={`bg-white p-6 rounded-lg shadow-lg w-72 flex flex-col text-center items-center transition-opacity duration-500 ease-in-out ${
//                 isFading ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <img src={logo} alt="Logo" className="w-24 h-auto mb-5 mx-auto" />
//               <p>로그인이 필요한 기능입니다.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommentModal;