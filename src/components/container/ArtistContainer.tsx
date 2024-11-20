import { useState } from "react";
import spotifyLogo from "../../assets/spotify.png";
import CommentModal from "../../components/CommentModal";
import Favorites from "../../components/Favorites";
import buttonReply from "../../assets/Reply.png";
import { StarRating } from "../../components/StarRating";

interface Artist {
  name: string;
  image_url: string;
  genres?: string[];
  spotify_url: string;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
}

interface ArtistContainerProps {
  artistData: Artist;
  artistID: string | undefined;
}

const ArtistContainer: React.FC<ArtistContainerProps> = ({ artistData, artistID }) => {
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
        {/* 3. 코멘트 모달 */}
        {isModalOpen && (
          <CommentModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={(comment: string) => console.log(comment)}
            Image={artistData.image_url}
            Title={artistData.name}
            // SubTitle={artistData.artist_names[0]}
            TypeID={artistID}
          />
        )}
        {/* 1. 앨범 이미지 섹션 */}
        <img
          src={artistData.image_url}
          alt="track cover"
          className="w-full h-auto rounded-md border drop-shadow-md"
        />
      </section>
      <section className="col-span-8">
        {/* 2. 앨범 정보 및 상호작용 섹션 */}
        <div className="flex flex-col justify-between h-full w-full">
          <h1 className="ml-2 text-3xl font-bold">{artistData.name}</h1>
          <p className="ml-2 text-gray_dark text-xl">
            {artistData.genres.join(", ")}
          </p>
          <p className="ml-2 text-gray_dark text-xl">
            ★ {artistData.avg_rated} / 5.0 | 🗎 {artistData.count_rated}
          </p>
          <a href={artistData.spotify_url} target="_blank">
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

export default ArtistContainer;
