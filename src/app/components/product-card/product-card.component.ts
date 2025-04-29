import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>(); // Tipado explícito

  constructor(private router: Router) {}

  navigateToProduct(): void {
    this.router.navigate(['/products', this.product.id]);
  }

  onAddToCart() {
    this.addToCart.emit(this.product); // Emite el objeto Product completo
  }
}