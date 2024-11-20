import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSearchAll } from "../../apis/searchAll";
import Favorites from "../../components/Favorites";
import spotifyLogo from "../../assets/spotify.png";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

const SearchResults: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const { artists, albums, tracks, loading, error } = useSearchAll(query || "");

  // 추가: 각 섹션의 전체보기 상태
  const [showAllTracks, setShowAllTracks] = useState(false);
  const [showAllArtists, setShowAllArtists] = useState(false);
  const [showAllAlbums, setShowAllAlbums] = useState(false);

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
      <div className="col-span-12">
        <h2 className="text-2xl font-bold mb-6">{query}에 대한 검색 결과</h2>

        {/* 트랙 섹션 */}
        <>
          <h2 className="text-xl font-bold mb-4">트랙</h2>
          <div>
            {(showAllTracks ? tracks : tracks.slice(0, 5)).map((track) => (
              <div key={track.id} className="flex border-b items-center">
                <div className="flex flex-row items-center space-x-2">
                  <img
                    src={track.image_url}
                    alt="Song Cover"
                    className="p-2 w-20 h-20 rounded"
                  />
                  <Link to={`/track/${track.id}`}>
                    <p className="text-lg font-bold">{track.name}</p>
                  </Link>
                  {track.album_artists.map((artist, index) => (
                    <Link key={artist.id} to={`/artist/${artist.id}`}>
                      <p className="text-sm font-semibold text-gray_dark inline">
                        {artist.name}
                      </p>
                      {index < track.album_artists.length - 1 && ", "}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center ml-auto">
                  <span className="text-sm font-bold text-gray_dark">
                    ★ {track.avg_rated} / 5.0 | 🗎 {track.count_rated}
                  </span>
                  <span className="m-2 w-8 h-8 ">
                    <Favorites />
                  </span>
                  <a
                    href={track.spotify_url}
                    target="_blank"
                    className="pointer-events-none"
                  >
                    <img
                      src={spotifyLogo}
                      alt="스포티파이 로고"
                      className="ml-2 w-7 h-7 rounded-full drop-shadow-md pointer-events-auto"
                    />
                  </a>
                </div>
              </div>
            ))}
            {/* 더보기 버튼 */}
            {tracks.length > 5 && (
              <button
                className="m-2 text-md text-gray_dark font-bold hover:text-coral"
                onClick={() => setShowAllTracks(!showAllTracks)}
              >
                {showAllTracks ? "접기" : "더보기"}
              </button>
            )}
          </div>
        </>

        {/* 아티스트 섹션 */}
        <>
          <h2 className="text-xl font-bold mb-4 mt-4">아티스트</h2>
          <div>
            {(showAllArtists ? artists : artists.slice(0, 5)).map((artist) => (
              <div key={artist.id} className="flex border-b items-center">
                <div className="flex flex-row items-center space-x-2">
                  <img
                    src={artist.image_url}
                    alt="Song Cover"
                    className="p-2 w-20 h-20 rounded"
                  />
                  <Link to={`/artist/${artist.id}`}>
                    <p className="text-lg font-bold">{artist.name}</p>
                  </Link>
                </div>
                <div className="flex items-center ml-auto">
                  <span className="text-sm font-bold text-gray_dark">
                    ★ {artist.avg_rated} / 5.0 | 🗎 {artist.count_rated}
                  </span>
                  <span className="m-2 w-8 h-8 ">
                    <Favorites />
                  </span>
                  <a
                    href={artist.spotify_url}
                    target="_blank"
                    className="pointer-events-none"
                  >
                    <img
                      src={spotifyLogo}
                      alt="스포티파이 로고"
                      className="ml-2 w-7 h-7 rounded-full drop-shadow-md pointer-events-auto"
                    />
                  </a>
                </div>
              </div>
            ))}
            {/* 더보기 버튼 */}
            {artists.length > 5 && (
              <button
                className="m-2 text-md text-gray_dark font-bold hover:text-coral"
                onClick={() => setShowAllArtists(!showAllArtists)}
              >
                {showAllArtists ? "접기" : "더보기"}
              </button>
            )}
          </div>
        </>

        {/* 앨범 섹션 */}
        <>
          <h2 className="text-xl font-bold mb-4 mt-4">앨범</h2>
          <div>
            {(showAllAlbums ? albums : albums.slice(0, 5)).map((album) => (
              <div key={album.id} className="flex border-b items-center">
                <div className="flex flex-row items-center space-x-2">
                  <img
                    src={album.image_url}
                    alt="Album Cover"
                    className="p-2 w-20 h-20 rounded"
                  />
                  <Link to={`/album/${album.id}`}>
                    <p className="text-lg font-bold">{album.name}</p>
                  </Link>
                  {album.album_artists.map((artist, index) => (
                    <Link key={artist.id} to={`/artist/${artist.id}`}>
                      <p className="text-sm font-semibold text-gray_dark inline">
                        {artist.name}
                      </p>
                      {index < album.album_artists.length - 1 && ", "}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center ml-auto">
                  <span className="text-sm font-bold text-gray_dark">
                    ★ {album.avg_rated} / 5.0 | 🗎 {album.count_rated}
                  </span>
                  <span className="m-2 w-8 h-8 ">
                    <Favorites />
                  </span>
                  <a
                    href={album.spotify_url}
                    target="_blank"
                    className="pointer-events-none"
                  >
                    <img
                      src={spotifyLogo}
                      alt="스포티파이 로고"
                      className="ml-2 w-7 h-7 rounded-full drop-shadow-md pointer-events-auto"
                    />
                  </a>
                </div>
              </div>
            ))}
            {/* 더보기 버튼 */}
            {albums.length > 5 && (
              <button
                className="m-2 text-md text-gray_dark font-bold hover:text-coral"
                onClick={() => setShowAllAlbums(!showAllAlbums)}
              >
                {showAllAlbums ? "접기" : "더보기"}
              </button>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default SearchResults;
