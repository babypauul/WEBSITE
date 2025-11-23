import { Track, NavigationItem } from './types';

// Placeholder audio URL for demonstration purposes since we don't have local files
const DEMO_AUDIO = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 

export const NAVIGATION: NavigationItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Music', path: '/music' },
  { label: 'Beats', path: '/beats' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const MUSIC_DATA: Track[] = [
  {
    id: 'm1',
    title: 'Neon Nights',
    artist: 'Babypauul',
    cover: 'https://picsum.photos/400/400?grayscale&random=1',
    audioSrc: DEMO_AUDIO,
    releaseDate: '2023-10-24',
    description: 'A dark synthwave track exploring the depths of the city.',
    type: 'song',
    spotifyUrl: '#',
  },
  {
    id: 'm2',
    title: 'Red Horizon',
    artist: 'Babypauul',
    cover: 'https://picsum.photos/400/400?grayscale&random=2',
    audioSrc: DEMO_AUDIO,
    releaseDate: '2023-11-01',
    description: 'Cinematic ambient soundscapes.',
    type: 'song',
    spotifyUrl: '#',
  },
  {
    id: 'm3',
    title: 'Void',
    artist: 'Babypauul',
    cover: 'https://picsum.photos/400/400?grayscale&random=3',
    audioSrc: DEMO_AUDIO,
    releaseDate: '2023-12-15',
    description: 'Heavy bass experimental production.',
    type: 'song',
    spotifyUrl: '#',
  }
];

export const BEAT_DATA: Track[] = [
  {
    id: 'b1',
    title: 'MIDNIGHT TOKYO',
    artist: 'Babypauul',
    // Dark Studio / Mixing Console
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop', 
    audioSrc: DEMO_AUDIO,
    type: 'beat',
    price: 29.99,
    description: 'TRAPSOUL • 140 BPM • C MINOR',
  },
  {
    id: 'b2',
    title: 'COLD BLOOD',
    artist: 'Babypauul',
    // Dark Vinyl / Analog Texture - Colder vibe
    cover: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1000&auto=format&fit=crop', 
    audioSrc: DEMO_AUDIO,
    type: 'beat',
    price: 34.99,
    description: 'UK DRILL • 142 BPM • G MINOR',
  },
  {
    id: 'b3',
    title: 'VENDETTA',
    artist: 'Babypauul',
    // Moody Dark Red Abstract / Lighting
    cover: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1000&auto=format&fit=crop', 
    audioSrc: DEMO_AUDIO,
    type: 'beat',
    price: 29.99,
    description: 'AFROBEAT • 100 BPM • F MAJOR',
  },
  {
    id: 'b4',
    title: 'PHANTOM',
    artist: 'Babypauul',
    // Synthesizer Keys dark
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000&auto=format&fit=crop', 
    audioSrc: DEMO_AUDIO,
    type: 'beat',
    price: 49.99,
    description: 'DARK TRAP • 160 BPM • A MINOR',
  },
];

export const CREDITS_DATA = [
  { artist: "Drake", role: "Co-Production", year: "2023" },
  { artist: "Travis Scott", role: "Recording Engineer", year: "2022" },
  { artist: "The Weeknd", role: "Sound Design", year: "2023" },
  { artist: "Playboi Carti", role: "Beat Production", year: "2024" },
  { artist: "Don Toliver", role: "Mixing", year: "2023" },
  { artist: "Future", role: "Production", year: "2022" },
];