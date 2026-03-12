import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieapiService } from '../movieapi-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './results.html',
  styleUrl: './results.css'
})

export class ResultsComponent {
  constructor(public movieService: MovieapiService) {}
}