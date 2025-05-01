import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [

  

  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AppComponent,
    HomeComponent,
    ProductCardComponent,
    CartComponent,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,

    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    provideAnimationsAsync(), // Añade esto para habilitar animaciones
  ],
  bootstrap: []
})
export class AppModule { }