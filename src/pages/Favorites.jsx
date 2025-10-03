import "../css/Favorites.css";
import { useMusicContext } from "../contexts/MusicContext.jsx";
import TrackCard from "../components/TrackCard.jsx";

function Favorites() {
  const { favorites } = useMusicContext();

  if (favorites && favorites.length > 0) {
    return (
      <div>
        <h2>Your Favorite Tracks:</h2>
        <div className="tracks-grid">
          {favorites.map((track) => (
            <TrackCard track={track} key={track.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Tracks Yet</h2>
      <p>Start adding tracks to your favorites and they will appear here.</p>
    </div>
  );
}

export default Favorites;