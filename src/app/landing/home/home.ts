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

    Boxes = [
    { id: 1,type: 'big', data: { title: 'Historial Ventas', path: '/ventas', img: '/economia.png' } },
    { id: 2,type: 'big', data: { title: 'Nueva Venta', path: '/nueva-venta', img: '/economia.png' } },
    { id: 3,type: 'big', data: { title: 'Historial Compra Proveedores', path: '/compras', img: '/economia.png' } },
    { id: 4,type: 'small', data: { title: 'Registrar Producto', path: '/registrar-producto', img: '/inventario.png' } },
    { id: 5,type: 'small', data: { title: 'Buscar Producto', path: '/productos', img: '/inventario.png' } },
    { id: 6,type: 'small', data: { title: 'Proveedores', path: '/proveedores', img: '/inventario.png' } }
  ];

}
