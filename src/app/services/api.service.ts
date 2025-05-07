import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment'; 
// import { environment } from '../../../environment.prod' ;
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  // Método genérico para GET
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  // Método genérico para POST
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }

  // Método genérico para PUT
  put(endpoint: string, id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}/${id}`, data);
  }

  // Método genérico para DELETE
  delete(endpoint: string, id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}/${id}`);
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