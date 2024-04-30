import { Component } from '@angular/core';

import {EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Product} from "../../model/product.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatFormFieldControl} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-products-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './crop-products-create-and-edit.component.html',
  styleUrl: './crop-products-create-and-edit.component.css'
})
export class ProductsCreateAndEditComponent {
  // Attributes
  @Input() product: Product;
  @Input() editMode = false;
  @Output() productAdded = new EventEmitter<Product>();
  @Output() productUpdated = new EventEmitter<Product>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('productForm', {static: false}) productForm!: NgForm;
  showForm = false;

  // Methods
  constructor() {
    this.product = {} as Product;
  }

  // Private methods
  private resetEditState() {
    this.product = {} as Product;
    this.editMode = false;
    this.productForm.resetForm();
  }
  // Event Handlers

  onSubmit() {
    if (this.productForm.form.valid) {
      let emitter = this.editMode ? this.productUpdated : this.productAdded;
      emitter.emit(this.product);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
    this.showForm = false;
  }

  onCancel() {
    this.editCanceled.emit();
    this.resetEditState();
    this.showForm = false;
  }
}
