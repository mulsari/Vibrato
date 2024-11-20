import React from "react";
import { useParams } from "react-router-dom";
import TrackContainer from "../../components/container/TrackContainer";
import { useGetTrack } from "../../apis/getTrack";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import RestTrackList from "../../components/RestTrackList";
import ReviewSection from "../../components/ReviewSection";

const Track: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const { track, loading, error } = useGetTrack(query || "");

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
      {track && <TrackContainer trackData={track} trackID={query}/>}
      <ReviewSection typeID={query} />
      <RestTrackList typeID={query} track_image_url={track?.image_url} />
    </div>
  );
};

export default Track;
