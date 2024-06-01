import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from '../../model/subscription.entity';
import { SubscriptionsService } from '../../services/subscriptions.service';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent implements OnInit {
   subscriptions: Subscription[] = [];

   constructor(private subscriptionsService: SubscriptionsService, private router: Router) { }

   ngOnInit(): void {
     this.getAllSubscriptions();
   }

   private getAllSubscriptions() {
     this.subscriptionsService.getAll().subscribe((response: any) => {
       this.subscriptions = response;
     });
   }
  getBackgroundColor(index: number): string {
   const colors = ["#005F40", "#9D7C58", "#9A5D4E"];
   return colors[index % colors.length];
  }
goToProfile(): void {
  this.router.navigate(['/profile']);
}
}
