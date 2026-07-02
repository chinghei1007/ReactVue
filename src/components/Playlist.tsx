import { useState } from "react";
import type { PlaylistResponse, PlaylistItem } from "../ytdlp";

export default function Playlist() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<PlaylistItem[]>([]);
  const [expectedCount, setExpectedCount] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItems([]);
    setExpectedCount(null);

    try {
  const res = await fetch(`/api/playlist?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error("Failed to fetch playlist");
  const data = await res.json();

  // yt-dlp returns `entries`, not `items`
  const mappedItems: PlaylistItem[] = (data.entries || []).map((entry: any) => ({
    id: entry.id,
    title: entry.title,
    thumbnail: entry.thumbnail,
    duration: entry.duration ? `${entry.duration}s` : "unknown",
    url: entry.webpage_url,
  }));

  setExpectedCount(mappedItems.length);

  setTimeout(() => {
    setItems(mappedItems.slice(0, 20));
  }, 800);
} catch (err) {
  setError("Error loading playlist.");
} finally {
  setLoading(false);
}
  }

  return (
    <div className={`playlist ${loading ? "loading" : ""}`}>
      <form onSubmit={handleSubmit} className="playlist-form">
        <input
          type="text"
          placeholder="Enter YouTube playlist URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !url}>
          Load Playlist
        </button>
      </form>

      <div className="status">
        {expectedCount !== null && (
          <p>
            Loaded {items.length} of {expectedCount} items
          </p>
        )}
      </div>

      {error && <div className="playlist-item error">{error}</div>}

      {items.map((item, i) => (
        <div
          key={item.id}
          className="playlist-item"
          style={{
            backgroundImage: `url(${item.thumbnail})`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          <div className="overlay">
            <h3>{item.title}</h3>
            <p>{item.duration}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
