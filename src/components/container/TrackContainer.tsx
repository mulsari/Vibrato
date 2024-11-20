import { useState } from "react";
import { Link } from "react-router-dom";
import spotifyLogo from "../../assets/spotify.png";
import CommentModal from "../../components/CommentModal";
import Favorites from "../../components/Favorites";
import buttonReply from "../../assets/Reply.png";
import { StarRating } from "../../components/StarRating";

interface Track {
  name: string;
  image_url: string;
  artist_names: string[];
  release_date: string;
  spotify_url: string;
  track_number: number;
  duration: number;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
  preview?: string;
  album: {
    id: number;
    name: string;
    spotify_url: string;
    avg_rated?: number;
    liked?: boolean;
  };
  artists: {
    id: string;
    name: string;
    spotify_url: string;
    liked?: boolean;
  };
}

interface TrackContainerProps {
  trackData: Track;
  trackID: string | undefined;
}

const TrackContainer: React.FC<TrackContainerProps> = ({ trackData, trackID }) => {
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
            Image={trackData.image_url}
            Title={trackData.name}
            SubTitle={trackData.album.name}
            TypeID={trackID}
          />
        )}
        {/* 1. 트랙 이미지 섹션 */}
        <img
          src={trackData.image_url}
          alt="track cover"
          className="w-full h-auto rounded-md border drop-shadow-md"
        />
      </section>
      <section className="col-span-8">
        {/* 2. 트랙 정보 및 상호작용 섹션 */}
        <div className="flex flex-col justify-between h-full w-full">
          <h1 className="ml-2 text-3xl font-bold">{trackData.name}</h1>
          {trackData.artists.map((artist, index) => (
            <Link key={artist.id} to={`/artist/${artist.id}`}>
              <h1 className="ml-2 text-2xl font-bold text-gray_dark">
                {artist.name}
              </h1>
              {index < trackData.artists.length - 1 && ", "}
            </Link>
          ))}
          <Link to={`/album/${trackData.album.id}`}>
            {" "}
            <h1 className="ml-2 text-xl font-bold text-gray_dark">
              {trackData.album.name}
            </h1>
          </Link>

          <p className="ml-2 text-gray_dark text-xl">
            ★ {trackData.avg_rated} / 5.0 | 🗎 {trackData.count_rated}
          </p>
          <a href={trackData.spotify_url} target="_blank">
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

export default TrackContainer;
