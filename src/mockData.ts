// mockData.ts
export const albumDetailMock = {
    name: "Example Album",
    image_url: "https://loremflickr.com/320/240?random=1",
    artists_names: ["Artist 1", "Artist 2"],
    genres: ["Pop", "Rock"],
    release_date: "2022-01-01",
    total_tracks: 10,
    spotify_url: "https://open.spotify.com/album/12345",
    avg_rated: 4.5,
    count_rated: 150,
    liked: true,
    tracks: [
      {
        id: 1,
        name: "Track 1",
        spotify_url: "https://open.spotify.com/track/12345",
        track_number: 1,
        avg_rated: 4.2,
        liked: true,
      },
      {
        id: 2,
        name: "Track 2",
        spotify_url: "https://open.spotify.com/track/67890",
        track_number: 2,
        avg_rated: 4.7,
        liked: false,
      },
      // 더 많은 트랙 추가 가능
    ],
    artists: [
      {
        id: 1,
        name: "Artist 1",
        spotify_url: "https://open.spotify.com/artist/12345",
        avg_rated: 4.8,
        liked: true,
      },
      {
        id: 2,
        name: "Artist 2",
        spotify_url: "https://open.spotify.com/artist/67890",
        avg_rated: 4.5,
        liked: false,
      },
    ],
};
