import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-around px-8">
      <div>
        <button
          onClick={() => navigate("/chart")}
          className="font-bold text-gray_dark hover:text-coral whitespace-nowrap truncate"
        >
          차트
        </button>
      </div>
      <div>
        <button
          onClick={() => navigate("/newmusic")}
          className="font-bold text-gray_dark hover:text-coral whitespace-nowrap truncate"
        >
          최신 트랙
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
