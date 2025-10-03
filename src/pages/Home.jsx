import TrackCard from "../components/TrackCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchTracks } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopHits = async () => {
      setLoading(true);
      try {
        const topHitsTracks = await searchTracks("Top Hits");
        setTracks(topHitsTracks);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to load top tracks...");
      } finally {
        setLoading(false);
      }
    };
    loadTopHits();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const searchResults = await searchTracks(searchQuery);
      setTracks(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search tracks...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for tracks..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="tracks-grid">
          {tracks.map((track) => (
            <TrackCard track={track} key={track.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
