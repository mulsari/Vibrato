import React, { useState, useEffect } from "react";
import favorites from "../assets/Favorites.png";
import unfavorites from "../assets/Unfavorites.png";
import { useAuthStore } from "../store/authStore";
import logo from "../assets/Logo.png";

interface FavoritesProps {
  isOpen: boolean;
  onClose: () => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onClose }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);
  const { isLoggedIn } = useAuthStore();

  const handleLikeClick = () => {
    if (isLoggedIn) {
      setIsLiked(!isLiked);
    } else {
      setShowLoginAlert(true);
      setIsFading(true);
    }
  };

  useEffect(() => {
    if (showLoginAlert) {
      const timer = setTimeout(() => {
        setIsFading(false);
        const closeTimer = setTimeout(() => {
          setShowLoginAlert(false);
          if (onClose) onClose();
        }, 500);
        return () => clearTimeout(closeTimer);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showLoginAlert, onClose]);

  return (
    <div>
      <button onClick={handleLikeClick}>
        <img
          src={isLiked ? favorites : unfavorites}
          alt={isLiked ? "좋아요 취소" : "좋아요"}
          className="w-full h-full object-contain drop-shadow-md"
        />
      </button>

      {!isLoggedIn && showLoginAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg w-72 flex flex-col text-center items-center transition-opacity duration-500 ease-in-out ${
              isFading ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={logo} alt="Logo" className="w-24 h-auto mb-5 mx-auto" />
            <p>로그인이 필요한 기능입니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites
