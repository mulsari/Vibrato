import { useState } from "react";
import searchIcon from "../../assets/search.png";
import Favorites from "../Favorites";

const FavoritesContainer = () => {
  const [activeTab, setActiveTab] = useState<"노래" | "아티스트" | "앨범">(
    "노래"
  );

  // 목데이터
  const songData = Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    title: `노래 제목 ${index + 1}`,
    artist: `아티스트 ${index + 1}`,
    image: "https://picsum.photos/300/300",
    rating: 5.0,
    ratingCount: 10,
  }));

  const artistData = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    name: `아티스트 ${index + 1}`,
    image: "https://picsum.photos/300/300",
    rating: 5.0,
    ratingCount: 10,
  }));

  const albumData = Array.from({ length: 7 }).map((_, index) => ({
    id: index,
    name: `앨범 ${index + 1}`,
    artist: `아티스트 ${index + 1}`,
    image: "https://picsum.photos/300/300",
    rating: 5.0,
    ratingCount: 10,
  }));

  const renderContent = () => {
    switch (activeTab) {
      case "노래":
        return songData.map((song, index) => (
          <div
            key={index}
            className="flex justify-between border-b items-center"
          >
            <div className="flex flex-row items-center space-x-2">
              <img
                src={song.image}
                alt="Song Cover"
                className="p-2 w-20 h-20 rounded"
              />
              <p className="text-lg font-bold">{song.title}</p>
              <p className="text-sm font-semibold text-gray_dark">
                {song.artist}
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-bold text-gray_dark">
                ★ {song.rating} / 5.0 | 🗎 {song.ratingCount}
              </span>
              <span className="m-2 w-8 h-8">
                <Favorites />
              </span>
            </div>
          </div>
        ));
      case "아티스트":
        return artistData.map((artist, index) => (
          <div
            key={index}
            className="flex justify-between border-b items-center"
          >
            <div className="flex flex-row items-center space-x-2">
              <img
                src={artist.image}
                alt="Song Cover"
                className="p-2 w-20 h-20 rounded"
              />
              <p className="text-lg font-bold">{artist.name}</p>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-bold text-gray_dark">
                ★ {artist.rating} / 5.0 | 🗎 {artist.ratingCount}
              </span>
              <span className="m-2 w-8 h-8">
                <Favorites />
              </span>
            </div>
          </div>
        ));
      case "앨범":
        return albumData.map((album, index) => (
          <div
            key={index}
            className="flex justify-between border-b items-center"
          >
            <div className="flex flex-row items-center space-x-2">
              <img
                src={album.image}
                alt="Song Cover"
                className="p-2 w-20 h-20 rounded"
              />
              <p className="text-lg font-bold">{album.name}</p>
              <p className="text-sm font-semibold text-gray_dark">
                {album.artist}
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-bold text-gray_dark">
                ★ {album.rating} / 5.0 | 🗎 {album.ratingCount}
              </span>
              <span className="m-2 w-8 h-8">
                <Favorites />
              </span>
            </div>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="col-span-8 bg-gray_light border rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold p-2 mr-40">보관함</h2>
        <div className="relative flex-grow">
          <img
            src={searchIcon}
            alt="Search Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
          <input
            type="text"
            placeholder="검색"
            className="bg-white rounded-full pl-12 py-1.5 w-full focus:outline-none"
          />
        </div>
      </div>
      <div className="flex space-x-10 m-4">
        <button
          className={`text-xl font-bold ${
            activeTab === "노래"
              ? "underline decoration-coral decoration-4 underline-offset-8"
              : ""
          }`}
          onClick={() => setActiveTab("노래")}
        >
          노래
        </button>
        <button
          className={`text-xl font-bold ${
            activeTab === "아티스트"
              ? "underline decoration-coral decoration-4 underline-offset-8"
              : ""
          }`}
          onClick={() => setActiveTab("아티스트")}
        >
          아티스트
        </button>
        <button
          className={`text-xl font-bold ${
            activeTab === "앨범"
              ? "underline decoration-coral decoration-4 underline-offset-8"
              : ""
          }`}
          onClick={() => setActiveTab("앨범")}
        >
          앨범
        </button>
      </div>
      <table className="w-full text-left">
        <tbody>{renderContent()}</tbody>
      </table>
    </div>
  );
};

export default FavoritesContainer;
