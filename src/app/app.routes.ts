import { Routes } from '@angular/router';
import { Home } from './landing/home/home'; // Ajusta la ruta según tu estructura
import { Productos } from './funcionalidades/pantallas/productos/productos';
import { Ventas } from './funcionalidades/pantallas/ventas/ventas';
import { Compras } from './funcionalidades/pantallas/compras/compras';
import { Proveedores } from './funcionalidades/pantallas/proveedores/proveedores';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'productos', component: Productos },
    { path: 'ventas', component: Ventas },
    { path: 'compras', component: Compras },
    { path: 'proveedores', component: Proveedores },
];
