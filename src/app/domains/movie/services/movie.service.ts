// services/movie.service.ts
import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase.service';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly supabaseService = inject(SupabaseService);

  async createMovie(movie: Movie): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await this.supabaseService.supabase
        .rpc('insert_movie', {
          p_id: movie.id,
          p_title: movie.title,
          p_release_year: movie.release_year,
          p_rating: movie.rating,
          p_quality: movie.quality,
          p_poster_url_large: movie.poster_url_large,
          p_video_url: movie.video_url,
          p_duration_minutes: movie.duration_minutes,
          p_release_date: movie.release_date
        });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error creating movie:', error);
      return { data: null, error };
    }
  }
}