import { createContext, useState, useContext, useEffect } from "react";

const MusicContext = createContext();

export const useMusicContext = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when app starts
  useEffect(() => {
    const storedFavs = localStorage.getItem("musicFavorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("musicFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a track to favorites
  const addToFavorites = (track) => {
    setFavorites((prev) => [...prev, track]);
  };

  // Remove a track from favorites by id
  const removeFromFavorites = (trackId) => {
    setFavorites((prev) => prev.filter((track) => track.id !== trackId));
  };

  // Check if a track is in favorites
  const isFavorite = (trackId) => {
    return favorites.some((track) => track.id === trackId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};