import FavoritesContainer from "../../components/container/FavoritesContainer";
import MyCommentSection from "../../components/MyCommentSection";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import buttonSettings from "../../assets/Settings.png";

const MyPage = () => {
  const { nickname, profileImageUrl } = useAuthStore();

  return (
    <div className="container mx-auto grid grid-cols-12 gap-10 px-5">
      {/* 프로필 섹션 */}
      <div className="col-span-12 flex items-center rounded-md p-5 justify-between">
        <div className="flex items-center space-x-8">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-40 h-40 rounded-full bg-light_coral border shadow-md"
          />
          <span className="text-2xl font-bold">{nickname} 님</span>
        </div>
        <Link to="/MyPage/Edit">
          <img src={buttonSettings} className="w-20 h-20" />
        </Link>
      </div>

      <FavoritesContainer />

      <MyCommentSection />
    </div>
  );
};

export default MyPage;
