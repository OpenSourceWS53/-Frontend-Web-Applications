import { Component , Input, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {CropCaresComponent} from "../../components/crop-cares/crop-cares.component";
import {
  ProductsCreateAndEditComponent
} from "../../components/crop-products-create-and-edit/crop-products-create-and-edit.component";
import {CropDiseasesComponent} from "../../components/crop-diseases/crop-diseases.component";

import {CropsProductsComponent} from "../../components/crop-products/crop-products.component";
import { Router } from '@angular/router'; // Import Router
import {SowingGeneralInformationComponent} from "../../components/sowing-general-information/sowing-general-information.component";
import {SowingsControlsComponent} from "../../components/sowing-controls/sowing-controls.component";

@Component({
  selector: 'app-sowing-information',
  standalone: true,
  imports: [MatTabsModule, SowingsControlsComponent, CropCaresComponent, ProductsCreateAndEditComponent, CropDiseasesComponent, SowingGeneralInformationComponent, CropsProductsComponent],
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
