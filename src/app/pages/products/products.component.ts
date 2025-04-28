import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service'; 
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  searchTerm: string = '';

  updateSearchTerm(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.products = this.productService.getProducts();
  }

  // Método para obtener productos filtrados
  get filteredProducts(): Product[] {
    if (!this.searchTerm) return this.products;
    return this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Método para obtener productos paginados
  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Método para obtener números de página
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  // Método para cambiar de página
  changePage(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}