import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = {
    id: '',
    name: '',
    price: 0,
    images: [],
    description: '',
    category: '',
    size: ''
  };
  isEditing = false;
  currentProductId: string | null = null;
  isLoading = false;
  errorMessage = '';

  isUploading = false;

  constructor(private productService: ProductService, private imageService: ImageService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar productos';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing && this.currentProductId) {
      this.productService.updateProduct(this.currentProductId, this.newProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.resetForm();
        },
        error: (err) => {
          this.errorMessage = 'Error al actualizar producto';
          console.error(err);
        }
      });
    } else {
      if (this.newProduct.images.length === 0) {
        this.newProduct.images = ['src/images'];
      }

      this.productService.createProduct(this.newProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.resetForm();
        },
        error: (err) => {
          this.errorMessage = 'Error al crear producto';
          console.error(err);
        }
      });
    }
  }

  editProduct(product: Product): void {
    this.newProduct = { ...product };
    this.currentProductId = product.id;
    this.isEditing = true;
  }

  deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar producto';
          console.error(err);
        }
      });
    }
  }

  resetForm(): void {
    this.newProduct = {
      id: '',
      name: '',
      price: 0,
      images: [],
      description: '',
      category: '',
      size: ''
    };
    this.isEditing = false;
    this.currentProductId = null;
    this.errorMessage = '';
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.isUploading = true;
      this.errorMessage = '';
      
      // Limpiamos las imágenes anteriores si las hubiera
      this.newProduct.images = [];
      
      // Convertimos FileList a array para manejar múltiples archivos
      const files = Array.from(input.files);
      
      // Subimos cada imagen al servidor
      files.forEach(file => {
        this.imageService.uploadImage(file).subscribe({
          next: (response) => {
            if (response.success && response.data?.url) {
              this.newProduct.images.push(response.data.url);
            }
          },
          error: (err) => {
            console.error('Error uploading image:', err);
            this.errorMessage = 'Error al subir una o más imágenes';
          },
          complete: () => {
            this.isUploading = false;
          }
        });
      });
    }
  }

  // Método para eliminar una imagen (opcional)
  removeImage(index: number, publicId?: string): void {
    if (publicId) {
      // Si tenemos publicId, eliminamos de Cloudinary
      this.imageService.deleteImage(publicId).subscribe({
        next: () => {
          this.newProduct.images.splice(index, 1);
        },
        error: (err) => {
          console.error('Error deleting image:', err);
          this.errorMessage = 'Error al eliminar la imagen';
        }
      });
    } else {
      // Si no tenemos publicId, solo la eliminamos del array local
      this.newProduct.images.splice(index, 1);
    }
  }
}