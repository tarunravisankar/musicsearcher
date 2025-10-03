import "../css/TrackCard.css";
import { useMusicContext } from "../contexts/MusicContext.jsx";

function TrackCard({ track }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMusicContext();
  const favorite = isFavorite(track.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(track.id);
    else addToFavorites(track);
  }

  return (
    <div className="track-card">
      <div className="track-poster">
        <img src={track.image} alt={track.name} />
        <div className="track-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥︎
          </button>
        </div>
      </div>
      <div className="track-info">
        <h3>{track.name}</h3>
        <p>{track.artist}</p>
        <p>{track.album}</p>
        {track.preview_url && (
          <audio controls src={track.preview_url}></audio>
        )}
        <a href={track.external_url} target="_blank" rel="noopener noreferrer">
          Listen on Spotify
        </a>
      </div>
    </div>
  );
}

export default TrackCard;
