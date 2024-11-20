// import axios from "axios";

// const clientId = VITE_SPOTIFY_CLIENT_ID;
// const clientSecret = VITE_SPOTIFY_CLIENT_SECRET;
// const redirectUri = VITE_SPOTIFY_REDIRECT_URI;

// export const getSpotifyAuthUrl = (): string => {
//   const scopes = "user-read-private user-read-email"; // 필요한 스코프
//   return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
//     redirectUri
//   )}&scope=${encodeURIComponent(scopes)}`;
// };

// export const getAccessToken = async (): Promise<string> => {
//   try {
//     const response = await axios.post(
//       "https://accounts.spotify.com/api/token",
//       new URLSearchParams({
//         grant_type: "client_credentials",
//         client_id: clientId,
//         client_secret: clientSecret,
//       }).toString(),
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     return response.data.access_token;
//   } catch (error) {
//     console.error("액세스 토큰을 가져오는데 실패했습니다.", error);
//     throw new Error("Failed to fetch access token");
//   }
// };
