import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDetails, MovieResult, SearchResults } from './models/moviedetails.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieapiService {

  private http = inject(HttpClient);

  private movie = signal<MovieDetails | null>(null);
  private movies = signal<MovieResult[] | null>(null);
  private currentPage = signal<number>(1);
  private totalResults = signal<number>(0);
  private maxPages = signal<number>(0);

  private baseUrl = 'https://www.omdbapi.com/';
  private apiKey = '3dc3e334';

  private searchTerm = signal<string>('');

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  searchTermData() {
    return this.searchTerm;
  }

  setMovie(movie: MovieDetails) {
    this.movie.set(movie);
  }

  movieData() {
    return this.movie;
  }

  getMovie(title: string) {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&t=${title}`;
    return this.http.get<MovieDetails>(url);
  }

  setMovies(results: SearchResults) {
    if(results.Response === 'True'){
      this.movies.set(results.Search);
      const total = Number(results.totalResults);
      this.totalResults.set(total);
      this.maxPages.set(Math.ceil(total / 10));
    }
  }

  moviesData() {
    return this.movies;
  }

  getMovies(title: string, page: number) {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&s=${title}&page=${page}`;
    return this.http.get<SearchResults>(url);
  }

  getMovieById(id: string) {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&i=${id}`;
    return this.http.get<MovieDetails>(url);
  }

  setCurrentPage(page: number) {
    this.currentPage.set(page);
  }

    currentPageData() {
    return this.currentPage;
  }

  totalResultsData() {
    return this.totalResults;
  }

  maxPagesData() {
    return this.maxPages;
  }

  nextPage() {
    if(this.currentPage() < this.maxPages()){
      const next = this.currentPage() + 1;

      this.currentPage.set(next);

      this.getMovies(this.searchTerm(), next)
        .subscribe(results => {
          this.setMovies(results);
        });
    }
  }

  previousPage() {
    if(this.currentPage() > 1){
      const prev = this.currentPage() - 1;

      this.currentPage.set(prev);

      this.getMovies(this.searchTerm(), prev)
        .subscribe(results => {
          this.setMovies(results);
        });
    }
  }

  resetSearch() {
    this.movies.set(null);
    this.movie.set(null);
    this.currentPage.set(1);
    this.totalResults.set(0);
    this.maxPages.set(0);
    this.searchTerm.set('');
  }

}