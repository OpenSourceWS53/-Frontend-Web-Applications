import { Component } from '@angular/core';
import {SubscriptionsComponent } from './subscriptions.component';

@Component({
  selector: 'app-subscriptions-list',
  standalone: true,
  imports: [SubscriptionsComponent],
  templateUrl: './subscriptions-list.component.html',
  styleUrl: './subscriptions-list.component.css'
})
export class SubscriptionsListComponent {

}
