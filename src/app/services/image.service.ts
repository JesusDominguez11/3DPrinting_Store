import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private apiService: ApiService) {}

  uploadImage(file: File): Observable<any> {
    return this.apiService.uploadImage(file);
  }

  deleteImage(publicId: string): Observable<any> {
    return this.apiService.deleteImage(publicId);
  }
}