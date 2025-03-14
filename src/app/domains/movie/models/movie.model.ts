export interface Movie {
  id?: number;
  title: string;
  release_year: number;
  rating: number;
  quality: string;
  poster_url_large: string;
  video_url: string;
  duration_minutes: number;
  release_date: string;
  created_at?: string;
  state?: boolean;
}