import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie.model';
import { AlertService } from '../shared/services/alert.service';
import { min } from 'rxjs';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export default class MovieComponent {

  private readonly fb = inject(FormBuilder);
  private readonly movieService = inject(MovieService);
  private readonly alertService = inject(AlertService);

  form: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.min(0)]],
    title: ['', [Validators.required, Validators.maxLength(65)]],
    release_year: [null, [Validators.required, Validators.min(1900)]],
    rating: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
    quality: ['', Validators.required],
    poster_url_large: ['', Validators.required],
    video_url: ['', Validators.required],
    duration_minutes: [null, [Validators.required, Validators.min(1)]],
    release_date: [null, Validators.required]
  });

  async onSubmit() {
    if (this.form.valid) {
      const movie: Movie = this.form.value;

      try {
        const { data, error } = await this.movieService.createMovie(movie);
        if (error) throw error;
        console.log(data);
        this.alertService.showSuccess("Película registrada.")
        this.form.reset();
      } catch (error) {
        console.error('Error al crear la película:', error);
      }
    }
  }
}
