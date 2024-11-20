import React from "react";
import { useParams } from "react-router-dom";
import { useGetArtist } from "../../apis/getArtist";
import ArtistContainer from "../../components/container/ArtistContainer";
import Discography from "../../components/discography";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import ReviewSection from "../../components/ReviewSection";

const Artist: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const { artist, loading, error } = useGetArtist(query || "");

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
      {artist && <ArtistContainer artistData={artist} artistID={query} />}
      <ReviewSection typeID={query} />
      <Discography TypeID={query} artistData={artist} />
    </div>
  );
};

export default Artist;
