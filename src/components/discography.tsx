import React, { useState } from "react";
import Favorites from "./Favorites";
import { useSearchAll } from "../apis/searchAll";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router-dom";

interface Artist {
  name: string;
  image_url: string;
  genres?: string[];
  spotify_url: string;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
}

interface DiscographyProps {
  TypeID: string;
  artistData: Artist;
}

const Discography: React.FC<DiscographyProps> = ({ TypeID, artistData }) => {
  const [activeTab, setActiveTab] = useState("인기 트랙");
  const { albums, tracks, loading, error } = useSearchAll(
    artistData.name || ""
  );

  console.log(TypeID);
  const popularTracks = tracks.filter((track) =>
    track.album_artists.some((artist) => String(artist.id) === TypeID)
  );

  const Releases = albums
    .filter((album) =>
      album.album_artists.some((artist) => String(artist.id) === TypeID)
    )
    .sort(
      (b, a) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );

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
        {/* Tab buttons */}
        <div className="flex space-x-4">
          <button
            className={`text-xl font-bold ${
              activeTab === "인기 트랙"
                ? "underline decoration-coral decoration-4 underline-offset-8"
                : ""
            }`}
            onClick={() => setActiveTab("인기 트랙")}
          >
            인기 트랙
          </button>
          <button
            className={`text-xl font-bold ${
              activeTab === "디스코그래피"
                ? "underline decoration-coral decoration-4 underline-offset-8"
                : ""
            }`}
            onClick={() => setActiveTab("디스코그래피")}
          >
            디스코그래피
          </button>
        </div>

        {/* Popular Tracks Tab */}
        {activeTab === "인기 트랙" && (
          <div className="mt-4 rounded-md border border-gray_border shadow-md">
            {popularTracks.map((track, index) => (
              <div
                key={index}
                className="flex justify-between border-b items-center"
              >
                <div className="flex flex-row items-center space-x-2">
                  <img
                    src={track.image_url}
                    alt="Track Cover"
                    className="p-2 w-20 h-20 rounded drop-shadow-md"
                  />
                  <div>
                    <Link to={`/track/${track.id}`}>
                      <p className="text-lg font-bold">{track.name}</p>
                    </Link>
                    <Link to={`/album/${track.album_id}`}>
                      <p className="text-sm font-semibold text-gray_dark">
                        {track.album_name}
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray_dark">
                    ★ {track.avg_rated || 0} / 5.0 | 🗎 {track.count_rated || 0}
                  </span>
                  <span className="m-2 w-8 h-8">
                    <Favorites />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Discography Tab */}
        {activeTab === "디스코그래피" && (
          <div className="mt-4 rounded-md border border-gray_border shadow-md">
            {Releases.map((album, index) => (
              <div
                key={index}
                className="flex justify-between border-b items-center"
              >
                <div className="flex flex-row items-center space-x-2">
                  <img
                    src={album.image_url}
                    alt="Album Cover"
                    className="p-2 w-20 h-20 rounded drop-shadow-md"
                  />
                  <div>
                    <Link to={`/album/${album.id}`}>
                      <p className="text-lg font-bold">{album.name}</p>
                    </Link>
                    <p className="text-sm font-semibold text-gray_dark">
                      {album.release_date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray_dark">
                    ★ {album.avg_rated || 0} / 5.0 | 🗎 {album.count_rated || 0}
                  </span>
                  <div className="m-2 w-8 h-8">
                    <Favorites />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Discography;
