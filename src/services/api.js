const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const BASE_URL = "https://api.spotify.com/v1";

// Get a temporary access token using Client Credentials Flow
export const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) throw new Error("Failed to get token");
  const data = await response.json();
  return data.access_token;
};

// Search tracks
export const searchTracks = async (query) => {
  const token = await getToken();
  const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=20`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Failed to fetch tracks");
  const data = await response.json();
  return data.tracks.items;
};