import { Component , Input, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {SowingCaresComponent} from "../../components/sowing-cares/sowing-cares.component";
import {CropDiseasesComponent} from "../../components/crop-diseases/crop-diseases.component";
import {UsedProductsComponent} from "../../components/used-products/used-products.component";
import { Router } from '@angular/router'; // Import Router
import {SowingGeneralInformationComponent} from "../../components/sowing-general-information/sowing-general-information.component";
import {SowingsControlsComponent} from "../../components/sowing-controls/sowing-controls.component";

@Component({
  selector: 'app-sowing-information',
  standalone: true,
  imports: [MatTabsModule, SowingsControlsComponent, SowingCaresComponent, CropDiseasesComponent,
  SowingGeneralInformationComponent, UsedProductsComponent],
  templateUrl: './sowings-information.component.html',
  styleUrl: './sowings-information.component.css'
})

export class SowingInformationComponent implements OnInit {
  sowingId: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.sowingId = window.history.state['sowingId'];
    console.log('Sowing ID:', this.sowingId);
  }


}
