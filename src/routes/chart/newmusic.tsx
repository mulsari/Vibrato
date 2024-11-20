import { fetchKoreaRecentTracks } from "../../apis/chat";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import spotifyLogo from "../../assets/spotify.png";
import Favorites from "../../components/Favorites";

// Track 타입 정의
export interface Track {
  id: string;
  name: string;
  preview: string | null;
  album_id: string;
  album_name: string;
  image_url: string;
  album_spotify_url: string;
  release_date: string;
  album_artists: {
    id: string;
    name: string;
    spotify_url: string;
    liked: boolean;
  }[];
  avg_rated: number;
  count_rated: number;
  liked: boolean;
}

const RecentKpopPage = () => {
  const [chartData, setChartData] = useState<Track[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const maxPageDisplay = 10;
  const [pageStart, setPageStart] = useState<number>(1);

  const navigate = useNavigate(); // useNavigate 훅 사용

  // chat.ts에서 fetchKoreaRecentTracks 사용하여 최신 Kpop 트랙 가져오기
  const fetchTracks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchKoreaRecentTracks(); // chat.ts에서 가져온 API 함수 사용
      setChartData(data);
    } catch (err) {
      setError("데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPageSet = () => {
    setPageStart((prev) => prev + maxPageDisplay);
  };

  const handlePrevPageSet = () => {
    setPageStart((prev) => Math.max(1, prev - maxPageDisplay));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = chartData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(chartData.length / itemsPerPage);
  const pageEnd = Math.min(pageStart + maxPageDisplay - 1, totalPages);

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
      <section className="col-span-12 p-4 bg-white overflow-hidden">
        <h2 className="text-2xl font-bold">국내 최신가요</h2>
        <div className="flex">
          <div className="flex-1 my-4">
            {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <div
                  key={item.id}
                  className="relative flex mb-4 p-4 border border-gray_border shadow-md rounded-md"
                >
                  <img
                    src={item.image_url}
                    alt={item.album_name}
                    className="w-32 h-32 mr-4 cursor-pointer drop-shadow-md rounded-md"
                    onClick={() => navigate(`/track/${item.id}`)} // 이미지 클릭 시 이동
                  />
                  <div className="flex flex-col h-32 w-full justify-between">
                    <h3
                      className="text-2xl font-bold cursor-pointer truncate"
                      onClick={() => navigate(`/track/${item.id}`)} // 제목 클릭 시 이동
                    >
                      {item.name}
                    </h3>
                    <div>
                      {item.album_artists.map((artist) => (
                        <span
                          className="font-semibold text-gray_dark cursor-pointer"
                          onClick={() => navigate(`/artist/${artist.id}`)}
                          key={artist.id}
                        >
                          {artist.name}
                        </span>
                      ))}
                    </div>
                    <p className="font-semibold text-gray_dark">
                      {item.release_date}
                    </p>
                    <div className="flex gap-2 items-center">
                      <a
                        href={item.album_spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6"
                      >
                        <img
                          src={spotifyLogo}
                          alt="스포티파이 로고"
                          className="w-6 h-6 rounded-full"
                        />
                      </a>
                      <span className="w-7 h-7">
                        <Favorites />
                      </span>
                    </div>
                  </div>
                  <p className="absolute bottom-4 right-4 font-semibold text-gray_dark">
                    ⭐︎ {item.avg_rated} / 5.0 | 🗎 {item.count_rated}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-gray_dark">데이터가 없습니다.</div>
            )}

            {chartData.length > 0 && (
              <div className="flex justify-center space-x-2 mt-4">
                {pageStart > 1 && (
                  <button onClick={handlePrevPageSet} className="px-3 py-1">
                    ←
                  </button>
                )}

                {Array.from(
                  { length: pageEnd - pageStart + 1 },
                  (_, index) => pageStart + index
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "font-bold underline decoration-coral decoration-4 underline-offset-8"
                        : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {pageEnd < totalPages && (
                  <button onClick={handleNextPageSet} className="px-3 py-1">
                    →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecentKpopPage;
