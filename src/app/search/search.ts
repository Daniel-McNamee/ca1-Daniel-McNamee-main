import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieapiService } from '../movieapi-service';
import { SearchResults } from '../models/moviedetails.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})

export class SearchComponent {

  title = '';

  constructor(public movieService: MovieapiService) {}

  onSubmit() {
    // store search term
    this.movieService.setSearchTerm(this.title);

    // reset pagination
    this.movieService.setCurrentPage(1);

    // perform search
    this.movieService.getMovies(this.title, 1)
      .subscribe(results => {
        if(results.Response === 'True'){
          this.movieService.setMovies(results);
        }
      });
  }

}