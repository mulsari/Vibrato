import PopularCommentSection from "../components/container/PopularCommentSection";
import PopularAlbumSection from "../components/container/PopularAlbumSection";

const Home = () => {
  return (
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      <PopularCommentSection />
      <PopularAlbumSection />
    </div>
  );
};

export default Home;
