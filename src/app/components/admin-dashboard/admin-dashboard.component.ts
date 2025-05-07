import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private productService: ProductService) {}

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
      // Aquí puedes implementar la subida real de imágenes
      this.newProduct.images = Array.from(input.files).map(file => 
        `assets/images/products/${file.name}`
      );
      
      // Opcional: Subir cada imagen al servidor
      /*
      Array.from(input.files).forEach(file => {
        this.productService.uploadImage(file).subscribe({
          next: (response) => {
            this.newProduct.images.push(response.url);
          },
          error: (err) => console.error('Error uploading image:', err)
        });
      });
      */
    }
  }
}