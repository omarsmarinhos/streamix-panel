import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { TheMovieDb } from "../models/the-movie-db.model";

@Injectable({
    providedIn: 'root'
})
export class TheMovieDbService {

    private readonly baseUrl = environment.movieDbApiUrl;
    private readonly http = inject(HttpClient);

    getData(id: number) {
        return this.http.get<TheMovieDb>(`${this.baseUrl}/${id}?language=es-MX`, {
            headers: {
                'Authorization': `Bearer ${environment.movieKey}`
            }
        });
    }
}