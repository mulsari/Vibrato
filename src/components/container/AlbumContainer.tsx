import { useState } from "react";
import spotifyLogo from "../../assets/spotify.png";
import CommentModal from "../CommentModal";
import Favorites from "../Favorites";
import buttonReply from "../../assets/Reply.png";
import { StarRating } from "../StarRating";
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
  };
  artists: {
    id: string;
    name: string;
    spotify_url: string;
    liked: boolean;
  };
}
interface AlbumContainerProps {
  albumData: Album;
  albumID: string | undefined;
}

const AlbumContainer: React.FC<AlbumContainerProps> = ({ albumData, albumID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [userRating, setUserRating] = useState<number>(0);
  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    console.log(`User Rating: ${rating}`);
  };

  return (
    <>
      <section className="col-span-4">
        {/* 코멘트 모달 */}
        {isModalOpen && (
          <CommentModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={(comment: string) => console.log(comment)}
            Image={albumData.image_url}
            Title={albumData.name}
            SubTitle={albumData.artist_names[0]}
            TypeID={albumID}
          />
        )}
        {/* 1. 앨범 이미지 섹션 */}
        <img
          src={albumData.image_url}
          alt="album cover"
          className="w-full h-auto rounded-md border drop-shadow-md"
        />
      </section>
      <section className="col-span-8">
        {/* 2. 앨범 정보 및 상호작용 섹션 */}
        <div className="flex flex-col justify-between h-full w-full">
          <h1 className="ml-2 text-3xl font-bold">{albumData.name}</h1>
          {albumData.artists.map((artist, index) => (
            <Link key={artist.id} to={`/artist/${artist.id}`}>
              <h1 className="ml-2 text-2xl font-bold text-gray_dark">
                {artist.name}
              </h1>
              {index < albumData.artists.length - 1 && ", "}
            </Link>
          ))}

          <p className="ml-2 text-gray_dark text-xl">
            ★ {albumData.avg_rated} / 5.0 | 🗎 {albumData.count_rated}
          </p>
          <a href={albumData.spotify_url} target="_blank">
            <img
              src={spotifyLogo}
              alt="스포티파이 로고"
              className="ml-2 w-12 h-12 rounded-full drop-shadow-md"
            />
          </a>
          <div className="flex space-x-4 items-center h-14">
            <span className="w-16 h-16">
              <Favorites />
            </span>
            <button onClick={handleOpenModal}>
              <img
                src={buttonReply}
                alt="코멘트 작성"
                className="w-16 h-16 object-contain drop-shadow-md"
              />
            </button>
            <StarRating
              initialRating={userRating}
              onRate={handleRatingChange}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AlbumContainer;
