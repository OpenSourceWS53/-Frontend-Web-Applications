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
import { MatTable } from '@angular/material/table';

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
  displayedColumns: string[] = ['appliedDate', 'productType', 'name', 'quantity','actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  isEditMode: boolean;
  showForm: boolean;

  constructor(private productsService: ProductsService) {
    this.isEditMode = false;
    this.showForm = false;
    this.productData = {} as Product;
    this.dataSource = new MatTableDataSource<any>();
  }

  private getAllProducts() {
    this.productsService.getAllProductsForSowing(this.sowingId).subscribe((response: any) => {
      console.log(response);
      this.dataSource.data = response;
    });
  };

  private resetEditState(): void {
    this.isEditMode = false;
    this.productData = {} as Product;
  }

private createProduct() {
  let newProduct = {
    sowingId: Number(this.sowingId), // make sure sowingId is a number
    name: this.productData.name,
    quantity: Number(this.productData.quantity), // make sure quantity is a number
    productType: this.productData.productType
  };
  console.log('Creating product with the following attributes:', newProduct);

  this.productsService.createProduct(this.sowingId, newProduct).subscribe((response: any) => {
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
    // Find the index of the product to be deleted
    const productIndex = this.dataSource.data.findIndex((product) => product.id === productId);

    // Remove the product from the data source
    if (productIndex > -1) {
      this.dataSource.data.splice(productIndex, 1);

      // Update the table data source and render the rows
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.table.renderRows();
    }

    // Make the request to the server to delete the product
    this.productsService.deleteProduct(this.sowingId, productId).subscribe();
  };

  onEditItem(element: Product) {
    this.isEditMode = true;
    this.productData = element;
    this.showForm = true;
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
