import React from "react";
import Favorites from "../components/Favorites";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { useGetRestTrack } from "../apis/getTrack";

interface RestTrack {
  id: string;
  name: string;
  artist_names: string[];
  preview_url: string;
  track_number: number;
  duration: string;
  avg_rated: number;
  count_rated: number;
  liked: boolean;
}

interface RestTrackListProps {
  typeID: string;
  track_image_url: string;
}

const RestTrackList: React.FC<RestTrackListProps> = ({
  typeID,
  track_image_url,
}) => {
  const { restTrack, loading, error } = useGetRestTrack(typeID || "");
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
    <section className="col-span-8">
      <div className="col-span-1">
        <h2 className="text-2xl font-bold">이 앨범의 다른 트랙</h2>
        <div className="mt-4 rounded-md border border-gray_border shadow-md">
          {restTrack.map((track) => (
            <div
              key={track.id}
              className="flex justify-between border-b items-center cursor-pointer hover:bg-very_light_coral"
            >
              <div className="flex flex-row items-center space-x-2">
                <img
                  src={track_image_url}
                  alt="Album Cover"
                  className="p-2 w-20 h-20 rounded"
                />
                <Link to={`/track/${track.id}`}>
                  <p className="text-lg font-bold truncate">{track.name}</p>
                </Link>
                <p className="text-sm font-semibold text-gray_dark">
                  트랙 {track.track_number}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-semibold text-gray_dark mr-2">
                  {track.duration}
                </p>
                <span className="text-sm font-bold text-gray_dark">
                  ★ {track.avg_rated || 0} / 5.0 | 🗎 {track.count_rated || 0}
                </span>
                <span className="m-2 w-8 h-8">
                  <Favorites liked={track.liked} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestTrackList;
