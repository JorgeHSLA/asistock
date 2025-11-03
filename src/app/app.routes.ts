import { Routes } from '@angular/router';
import { Home } from './landing/home/home'; // Ajusta la ruta según tu estructura
import { Productos } from './funcionalidades/pantallas/productos/productos';
import { Ventas } from './funcionalidades/pantallas/ventas/ventas';
import { Compras } from './funcionalidades/pantallas/compras/compras';
import { Proveedores } from './funcionalidades/pantallas/proveedores/proveedores';
import { RegistrarProducto } from './funcionalidades/pantallas/productos/registrar-producto/registrar-producto';
import { BuscarProducto } from './funcionalidades/pantallas/productos/buscar-producto/buscar-producto';
import { EditarProducto } from './funcionalidades/pantallas/productos/editar-producto/editar-producto';
import { RegistrarEstudiante } from './funcionalidades/pantallas/estudiantes/registrar-estudiante/registrar-estudiante';
import { BuscarEstudiante } from './funcionalidades/pantallas/estudiantes/buscar-estudiante/buscar-estudiante';
import { EditarEstudiante } from './funcionalidades/pantallas/estudiantes/editar-estudiante/editar-estudiante';
import { NuevaVenta } from './funcionalidades/pantallas/ventas/nueva-venta/nueva-venta';
import { Alarmas } from './funcionalidades/pantallas/alarmas/alarmas';
import { Reportes } from './funcionalidades/pantallas/reportes/reportes';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'productos', component: Productos },
    { path: 'registrar-producto', component: RegistrarProducto },
    { path: 'buscar-producto', component: BuscarProducto },
    { path: 'editar-producto/:id', component: EditarProducto },
    { path: 'registrar-estudiante', component: RegistrarEstudiante },
    { path: 'buscar-estudiante', component: BuscarEstudiante },
    { path: 'editar-estudiante/:id', component: EditarEstudiante },
    { path: 'ventas', component: Ventas },
    { path: 'nueva-venta', component: NuevaVenta },
    { path: 'compras', component: Compras },
    { path: 'proveedores', component: Proveedores },
    { path: 'reportes', component: Reportes },
    { path: 'alarmas', component: Alarmas },
];
