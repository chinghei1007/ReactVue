// src/types/ytdlp.d.ts
export interface PlaylistItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
}

export interface PlaylistResponse {
  title: string;
  uploader?: string;
  entries: PlaylistItem[];
}
