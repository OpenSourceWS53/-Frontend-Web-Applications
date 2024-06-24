import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from "@angular/material/toolbar";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";
import { AuthenticationSectionComponent } from './iam/components/authentication-section/authentication-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuthenticationSectionComponent, RouterOutlet, MatToolbar, MatButton, RouterLink, MatIcon, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-web-applications';
}
