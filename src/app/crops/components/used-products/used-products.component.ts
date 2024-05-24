import { Component, AfterViewInit, OnInit, ViewChild, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { ProductsService } from "../../services/products.service";
import { Product } from "../../model/product.entity";
import { UsedProductsCreateAndEditComponent } from "../used-products-create-and-edit/used-products-create-and-edit.component";

@Component({
  selector: 'app-used-products',
  standalone: true,
  imports: [
    MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, UsedProductsCreateAndEditComponent
  ],
  templateUrl: './used-products.component.html',
  styleUrl: './used-products.component.css'
})
export class UsedProductsComponent implements OnInit, AfterViewInit {
  @Input() sowingId!: number;
  productData: Product;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['date', 'type', 'name', 'quantity','actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  constructor(private productsService: ProductsService) {
    this.isEditMode = false;
    this.productData = {} as Product;
    this.dataSource = new MatTableDataSource<any>();
  }

  private getAllProducts() {
    this.productsService.getAll().subscribe((response: any) => {
      console.log(response);
      this.dataSource.data = response.filter((product: any) => product.sowing_id === this.sowingId);
    });
  };

  private resetEditState(): void {
    this.isEditMode = false;
    this.productData = {} as Product;
  }

private createProduct() {
  this.productData.sowing_id = this.sowingId;
  this.productData.date = new Date().toISOString().slice(0,10);
  this.productsService.create(this.productData).subscribe((response: any) => {
    this.dataSource.data.push({...response});
    this.dataSource.data = this.dataSource.data.map((product: Product) => { return product; });
  });
};

  private updateProduct() {
    let controlToUpdate = this.productData;
    this.productsService.update(this.productData.id, controlToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((product: Product) => {
        if (product.id === response.id) {
          return response;
        }
        return product;
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
}
