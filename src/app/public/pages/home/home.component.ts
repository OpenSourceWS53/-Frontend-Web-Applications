import { Component } from '@angular/core';
import {AsyncPipe, NgForOf} from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe,
    MatGridListModule,
    MatButtonModule,
    RouterLink,
    NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tiles = [
    {img: 'assets/images/statical.png', text: 'Statical Reports', link: '/statistics'},
    {img: 'assets/images/registration.png', text: 'Crop Registration', link: '/mycrops'},
    {img: 'assets/images/forum.png', text: 'Consultation Forum', link: '/forum'},
    {img: 'assets/images/history.png', text: 'Crops History', link: '/history'}
  ];
}

