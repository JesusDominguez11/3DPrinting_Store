import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  relatedProducts: Product[] = [];
  loading = true; // Para manejar el estado de carga

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const productId = params.get('id');
        if (!productId) {
          this.router.navigate(['/products']);
          return of(null);
        }
        
        this.loading = true;
        return this.productService.getProductById(productId).pipe(
          switchMap(product => {
            this.product = product;
            return this.productService.getRelatedProducts(productId);
          }),
          catchError(error => {
            console.error('Error loading product:', error);
            this.router.navigate(['/products']);
            return of([]);
          })
        );
      })
    ).subscribe({
      next: (relatedProducts) => {
        if (relatedProducts) {
          this.relatedProducts = relatedProducts;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
        this.router.navigate(['/products']);
      }
    });
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }
}