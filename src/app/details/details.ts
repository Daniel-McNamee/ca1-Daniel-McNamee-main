import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieapiService } from '../movieapi-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class DetailsComponent {
  constructor(public movieService: MovieapiService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.movieService.getMovieById(id)
        .subscribe(movie => {
          this.movieService.setMovie(movie);
        });
    }
  }

}