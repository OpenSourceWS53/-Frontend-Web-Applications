import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { ProductsService } from "../../services/products.service";
import { Product } from "../../model/product.entity";
import {
  ProductsCreateAndEditComponent
} from "../crop-products-create-and-edit/crop-products-create-and-edit.component";


@Component({
  selector: 'app-crops-products',
  standalone: true,
  imports: [
    MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, ProductsCreateAndEditComponent
  ],
  templateUrl: './crop-products.component.html',
  styleUrl: './crop-products.component.css'
})
export class CropsProductsComponent implements OnInit, AfterViewInit {
  productData: Product;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['date', 'type', 'name', 'quantity','actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  // Constructor
  constructor(private productsService: ProductsService) {
    this.isEditMode = false;
    this.productData = {} as Product;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.productData = {} as Product;
  }

  // CRUD Actions

  private getAllProducts() {
    this.productsService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createProduct() {
    this.productsService.create(this.productData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((product: Product) => { return product; });
    });
  };

  private updateProduct() {
    let controlToUpdate = this.productData;
    this.productsService.update(this.productData.id, controlToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((student: Product) => {
        if (student.id === response.id) {
          return response;
        }
        return student;
      });
    });
  };

  private deleteProduct(productId: number) {
    this.productsService.delete(productId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((product: Product) => {
        return product.id !== productId ? product : false;
      });
    });
  };

  // UI Event Handlers

  onEditItem(element: Product) {
    this.isEditMode = true;
    this.productData = element;
  }

  onDeleteItem(element: Product) {
    this.deleteProduct(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllProducts();
  }

  onProductAdded(element: Product) {
    this.productData = element;
    this.createProduct();
    this.resetEditState();
  }

  onProductUpdated(element: Product) {
    this.productData = element;
    this.updateProduct();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

}
