import { useEffect, useState } from "react";
import { fetchGlobalTop50 } from "../../apis/chat";
import { Link } from "react-router-dom";

const PopularAlbumSection = () => {
  const [popularAlbumData, setPopularAlbumData] = useState<album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetchGlobalTop50(10);
        setPopularAlbumData(response);
        setLoading(false);
      } catch (error: any) {
        console.error("Global Top 50 차트를 가져오는 데 실패했습니다:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);
  console.log(popularAlbumData);
  return (
    <aside className="col-span-4 p-4 bg-white">
      <a
        href="chart"
        className="text-2xl font-bold mb-4 hover:underline hover:decoration-coral hover:decoration-4 hover:underline-offset-8"
      >
        인기 앨범
      </a>

      {popularAlbumData.map((album) => (
        <div
          key={album.id}
          className="shadow-xl p-4 rounded-md mb-4 my-4 border border-gray_border truncate"
        >
          <div className="flex flex-grow items-center">
            <img
              src={album.image_url}
              alt={album.album_name}
              className="w-20 h-20 bg-coral rounded border drop-shadow-md"
            />
            <div className="ml-4 flex flex-col">
              <Link to={`/album/${album.album_id}`}>
                <h4 className="font-bold text-lg">{album.album_name}</h4>
              </Link>

              <p className="text-sm font-semibold text-gray_dark">
                {album.album_artists.map((artist) => artist.name).join(", ")}
              </p>
              <p className="text-sm text-gray_dark font-semibold ">
                {album.release_date}
              </p>
              <span className="text-sm text-gray_dark font-semibold ">
                ★ {album.avg_rated} / 5.0 | 🗎 {album.count_rated}
              </span>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default PopularAlbumSection;
