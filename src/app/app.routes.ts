import { Routes } from '@angular/router';
import { Home } from './landing/home/home'; // Ajusta la ruta según tu estructura
import { Productos } from './funcionalidades/pantallas/productos/productos';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'productos', component: Productos },
];
