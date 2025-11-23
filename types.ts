export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioSrc: string; // Placeholder for local path or URL
  releaseDate?: string;
  description?: string;
  duration?: string;
  spotifyUrl?: string;
  appleUrl?: string;
  type: 'song' | 'beat';
  price?: number; // For beats
}

export interface NavigationItem {
  label: string;
  path: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Icon name
}