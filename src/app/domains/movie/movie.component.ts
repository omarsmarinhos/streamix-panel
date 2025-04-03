import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie.model';
import { AlertService } from '../shared/services/alert.service';
import { min } from 'rxjs';
import { TheMovieDbService } from './services/the-movie-db.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export default class MovieComponent {

  private readonly fb = inject(FormBuilder);
  private readonly movieService = inject(MovieService);
  private readonly alertService = inject(AlertService);
  private readonly theMovieDbService = inject(TheMovieDbService);

  isLoading = signal(false);

  form: FormGroup = this.fb.group({
    id: ['', [
      Validators.required,
      Validators.min(0)
    ]],
    title: ['', [
      Validators.required,
      Validators.maxLength(65)
    ]],
    release_year: [null, [
      Validators.required,
      Validators.min(1900)
    ]],
    rating: [null, [
      Validators.required,
      Validators.min(0),
      Validators.max(10)
    ]],
    quality: ['HD',
      Validators.required
    ],
    poster_url_large: ['',
      Validators.required
    ],
    video_url: ['',
      Validators.required
    ],
    duration_minutes: [null, [
      Validators.required,
      Validators.min(1)
    ]],
    release_date: [null,
      Validators.required
    ]
  });

  async onSubmit() {
    if (this.form.valid) {
      const movie: Movie = this.form.value;

      this.isLoading.set(true);
      try {
        const { data, error } = await this.movieService.createMovie(movie);
        this.isLoading.set(false);
        if (error) throw error;
        this.alertService.showSuccess("Película registrada.")
        this.form.reset();
      } catch (error) {
        console.error('Error al crear la película:', error);
        this.isLoading.set(false);

      }
    }
  }

  searchMovieDB(value: string) {
    const id = Number(value);
    this.isLoading.set(true);
    this.theMovieDbService.getData(id).subscribe({
      next: (res) => {
        this.form.patchValue({
          title: res.title,
          release_year: new Date(res.release_date).getFullYear(),
          rating: res.vote_average,
          duration_minutes: res.runtime,
          release_date: res.release_date
        });
        this.isLoading.set(false);

      },
      error: (err) => {
        console.error(err);
        this.alertService.showError("Hubo un error con la real api de TheMovieDB.")
        this.isLoading.set(false);
      }
    });
  }
}
