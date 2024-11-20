import Favorites from "../components/Favorites";
import { Link } from "react-router-dom";

interface Album {
  name: string;
  image_url: string;
  artist_names: string[];
  genres?: string[];
  release_date: string;
  total_tracks: number[];
  spotify_url: string;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
  tracks: {
    id: string;
    name: string;
    spotify_url: string;
    track_number: number;
    liked?: boolean;
  }[];
  artist: {
    id: string;
    name: string;
    spotify_url: string;
    liked: boolean;
  };
}

interface TrackListProps {
  albumData: Album;
}

const TrackList: React.FC<TrackListProps> = ({ albumData }) => {
  return (
    <section className="col-span-8">
      <div className="col-span-1">
        <h2 className="text-2xl font-bold">트랙</h2>
        <div className="mt-4 rounded-md border border-gray_border shadow-md">
          {albumData.tracks.map((track) => (
            <div
              key={track.id}
              className="flex justify-between border-b items-center cursor-pointer hover:bg-very_light_coral"
            >
              <div className="flex flex-row items-center space-x-2">
                {/* 앨범 이미지가 없으므로 앨범 전체 이미지를 사용하거나 기본값 설정 */}
                <img
                  src={albumData.image_url}
                  alt="album Cover"
                  className="p-2 w-20 h-20 rounded"
                />
                <Link to={`/track/${track.id}`}>
                  <p className="text-lg font-bold">{track.name}</p>
                </Link>

                <p className="text-sm font-semibold text-gray_dark">
                  트랙 {track.track_number}
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-bold text-gray_dark">
                  ★ {albumData.avg_rated} / 5.0 | 🗎 {albumData.count_rated}
                </span>
                <span className="m-2 w-8 h-8">
                  <Favorites />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrackList;
