import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service'; 
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatIcon],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  sizes: string[] = [];

  //pagination
  currentPage = 1;
  itemsPerPage = 6;

  //filters
  searchTerm: string = '';
  selectedCategories: string[] = [];
  selectedSizes: string[] = [];
  priceRange = { min: 0, max: 200 };
  currentPriceRange = { min: 0, max: 200 };

    // Estado sidebar
  isSidebarOpen = false;
  isLoading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    // this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products];
    this.categories = this.productService.getCategories();
    this.sizes = this.productService.getSizes();
    this.calculatePriceRange();
    this.applyFilters();

    // Inicializar con el rango de precios real
    this.priceRange.max = Math.max(...this.products.map(p => p.price));
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (productsFromApi) => {
        this.products = productsFromApi;
        this.filteredProducts = [...this.products];
        this.calculatePriceRange();
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.products = [];
        this.filteredProducts = [];
        this.isLoading = false;
      }
    });
  }

  // Actualiza el término de búsqueda
  updateSearchTerm(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  // Método para actualizar precios
  updatePrice(type: 'min' | 'max', event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = parseFloat(inputElement.value);
    
    if (!isNaN(value)) {
      if (type === 'min') {
        this.currentPriceRange.min = value;
      } else {
        this.currentPriceRange.max = value;
      }
      this.applyFilters();
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

    // Calcula el rango de precios real de los productos
    calculatePriceRange(): void {
      if (this.products.length > 0) {
        const prices = this.products.map(p => p.price);
        this.priceRange.min = Math.min(...prices);
        this.priceRange.max = Math.max(...prices);
        this.currentPriceRange = { ...this.priceRange };
      }
    }
  

  // Aplica todos los filtros
  applyFilters(): void {
    this.currentPage = 1; // Resetear a la primera página al aplicar filtros
    this.filteredProducts = this.products.filter(product => {
      // Filtro por término de búsqueda
      const matchesSearch = this.searchTerm === '' || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        (product.description && product.description.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      // Filtro por categoría
      const matchesCategory = this.selectedCategories.length === 0 || 
        this.selectedCategories.includes(product.category || '');
      
      // Filtro por tamaño
      const matchesSize = this.selectedSizes.length === 0 || 
        this.selectedSizes.includes(product.size || '');
      
      // Filtro por precio
      const matchesPrice = product.price >= this.currentPriceRange.min && 
        product.price <= this.currentPriceRange.max;
      
      return matchesSearch && matchesCategory && matchesSize && matchesPrice;
    });
  }

  // Restablece todos los filtros
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategories = [];
    this.selectedSizes = [];
    this.currentPriceRange = { ...this.priceRange };
    this.applyFilters();
  }

  toggleCategory(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }

  toggleSize(size: string): void {
    const index = this.selectedSizes.indexOf(size);
    if (index > -1) {
      this.selectedSizes.splice(index, 1);
    } else {
      this.selectedSizes.push(size);
    }
    this.applyFilters();
  }

  // Maneja cambios en el rango de precios
  onPriceChange(): void {
    this.applyFilters();
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