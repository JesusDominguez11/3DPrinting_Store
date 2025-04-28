import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent, runGuardsAndResolvers: 'always' },
  { path: 'cart', component: CartComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Habilitar restauración de posición //cambiar entre top y enabled segun
    anchorScrolling: 'enabled', // Habilitar scroll a anclas
    onSameUrlNavigation: 'reload' // Permitir recarga en misma URL
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
