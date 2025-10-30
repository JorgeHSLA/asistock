import { Component } from '@angular/core';
import { BigBox } from "../big-box/big-box";
import { SmallBox } from '../small-box/small-box';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [BigBox, SmallBox,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  currentSlide = 0;
  
  // Pantalla 1: Historial Ventas, Historial Compra Proveedores, Proveedores, Trabajadores, Locales
  slide1 = [
    { id: 1, type: 'big', data: { title: 'Historial Ventas', path: '/ventas', img: '/economia.png' } },
    { id: 2, type: 'big', data: { title: 'Historial Compra Proveedores', path: '/compras', img: '/economia.png' } },
    { id: 3, type: 'small', data: { title: 'Proveedores', path: '/proveedores', img: '/inventario.png' } },
    { id: 4, type: 'small', data: { title: 'Trabajadores', path: '/trabajadores', img: '/inventario.png' } },
    { id: 5, type: 'small', data: { title: 'Locales', path: '/locales', img: '/inventario.png' } }
  ];

  // Pantalla 2: Registrar Producto, Buscar Producto, Creacion Combos, Nueva venta, Panel de Reportes y Estadísticas
  slide2 = [
    { id: 6, type: 'small', data: { title: 'Registrar Producto', path: '/registrar-producto', img: '/inventario.png' } },
    { id: 7, type: 'small', data: { title: 'Buscar Producto', path: '/buscar-producto', img: '/inventario.png' } },
    { id: 8, type: 'small', data: { title: 'Creacion Combos', path: '/combos', img: '/inventario.png' } },
    { id: 9, type: 'big', data: { title: 'Nueva venta', path: '/nueva-venta', img: '/economia.png' } },
    { id: 10, type: 'big', data: { title: 'Panel de Reportes y Estadísticas', path: '/reportes', img: '/economia.png' } }
  ];

  // Pantalla 3: Alarmas, Administrar Home, Registrar Estudiante, Buscar Estudiante, Premios de Puntos
  slide3 = [
    { id: 11, type: 'big', data: { title: 'Alarmas', path: '/alarmas', img: '/economia.png' } },
    { id: 12, type: 'big', data: { title: 'Administrar Home', path: '/administrar-home', img: '/economia.png' } },
    { id: 13, type: 'small', data: { title: 'Registrar Estudiante', path: '/registrar-estudiante', img: '/inventario.png' } },
    { id: 14, type: 'small', data: { title: 'Buscar Estudiante', path: '/buscar-estudiante', img: '/inventario.png' } },
    { id: 15, type: 'small', data: { title: 'Premios de Puntos', path: '/premios', img: '/inventario.png' } }
  ];

  slides = [this.slide1, this.slide2, this.slide3];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
