import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search';
import { ResultsComponent } from '../results/results';
import { MovieapiService } from '../movieapi-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, ResultsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  constructor(private movieService: MovieapiService) {}

  ngOnInit() {
    this.movieService.resetSearch();
  }
  
}