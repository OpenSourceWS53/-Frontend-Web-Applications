import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import { AuthenticationService } from "../../iam/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  basePath: string = `${environment.serverBasePath}`;

  resourceEndpoint: string = '/resources';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`, // replace `this.authService.getToken()` with your method of getting the token
    })
  };

  constructor(private http: HttpClient, private authService: AuthenticationService) {  } // Inject AuthenticationService here

  handleError(error: HttpErrorResponse) {
    // Default error handling
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  // Create Resource
  create(item: any): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  // Delete Resource
  delete(id: any) {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));

  }

  // Update Resource
  update(id: any, item: any): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));

  }

  // Get All Resources
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.resourcePath(), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  getByIdParam(param:string,id: any): Observable<T> {
    return this.http.get<T>(`${this.resourcePath()}/?${param}=${id}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));

  }

  getById(id: any): Observable<T> {
    return this.http.get<T>(`${this.resourcePath()}/${id}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  // CRUD related to controls
  getControls(sowingId: number): Observable<T[]> {
      return this.http.get<T[]>(this.resourcePathForControls(sowingId), this.httpOptions)
          .pipe(retry(2), catchError(this.handleError));
    }

  createControl(sowingId: number, control: any): Observable<T> {
        return this.http.post<T>(this.resourcePathForControls(sowingId), JSON.stringify(control), this.httpOptions)
            .pipe(retry(2), catchError(this.handleError));
            }
  deleteControl(sowingId: number, controlId: number) {
    return this.http.delete(`${this.resourcePathForControls(sowingId)}/${controlId}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  // Create Product
  createProduct(sowingId: number, product: any): Observable<T> {
    return this.http.post<T>(`${this.resourcePathForProducts(sowingId)}`, JSON.stringify(product), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Products
  getProducts(): Observable<T[]> {
    return this.http.get<T[]>(`${this.basePath}/products`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Products for a specific sowing
  getAllProductsForSowing(sowingId: number): Observable<T[]> {
    return this.http.get<T[]>(`${this.resourcePathForProducts(sowingId)}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  deleteProduct(sowingId: number, productId: number) {
  return this.http.delete(`${this.resourcePathForProducts(sowingId)}/${productId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  protected resourcePathForProducts(sowingId: number): string {
    return `${this.basePath}/sowings/${sowingId}/products`;
  }
  protected resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }
  protected resourcePathForControls(sowingId: number): string {
      return `${this.resourcePath()}/${sowingId}/controls`;
    }
}
