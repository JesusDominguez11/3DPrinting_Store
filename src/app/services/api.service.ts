import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment'; 
// import { environment } from '../../../environment.prod' ;
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api';
  // private apiUrl2 = environment.apiUrl;

  constructor(    
    public http: HttpClient,
    public authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const token = this.authService.token;
    if (token) {
      return headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Método genérico para GET
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Método genérico para POST
  post(endpoint: string, data: any): Observable<any> {
    console.log(`${this.apiUrl}/${endpoint}`);
    // console.log(this.getHeaders());
    console.log(this.authService.token);
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Método genérico para PUT
  put(endpoint: string, id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}/${id}`, data, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Método genérico para DELETE
  delete(endpoint: string, id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}/${id}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

// Método específico para upload de imágenes
uploadImage(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('image', file);

  // Headers sin Content-Type para permitir que el navegador
  // establezca automáticamente multipart/form-data con el boundary
  let headers = new HttpHeaders();
  const token = this.authService.token;
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return this.http.post(`${this.apiUrl}/images/upload`, formData, {
    headers: headers
  }).pipe(
    catchError(this.handleError)
  );
}

deleteImage(publicId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/images/${publicId}`, {
    headers: this.getHeaders()
  }).pipe(
    catchError(this.handleError)
  );
}

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }

  // api.service.ts
testConnection(): Observable<any> {
  return this.http.get(`${this.apiUrl}/ping`).pipe(
    catchError(error => {
      console.error('Error de conexión:', error);
      return throwError(error);
    })
  );
}
}