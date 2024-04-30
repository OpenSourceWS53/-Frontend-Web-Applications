import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {CropsControlsComponent} from "../../components/crop-controls/crop-controls.component";
import {CropCaresComponent} from "../../components/crop-cares/crop-cares.component";
import {
  ProductsCreateAndEditComponent
} from "../../components/crop-products-create-and-edit/crop-products-create-and-edit.component";
import {CropDiseasesComponent} from "../../components/crop-diseases/crop-diseases.component";
import {
  CropGeneralInformationComponent
} from "../../components/crop-general-information/crop-general-information.component";
import {CropsProductsComponent} from "../../components/crop-products/crop-products.component";


@Component({
  selector: 'app-crop-information',
  standalone: true,
  imports: [MatTabsModule, CropsControlsComponent, CropCaresComponent, ProductsCreateAndEditComponent, CropDiseasesComponent, CropGeneralInformationComponent, CropsProductsComponent],
  templateUrl: './crops-information.component.html',
  styleUrl: './crops-information.component.css'
})
export class CropInformationComponent {

}
