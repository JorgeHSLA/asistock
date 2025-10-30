import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../../services/producto.service';
import { Producto } from '../../../../models/producto';

@Component({
  selector: 'app-buscar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-producto.html',
  styleUrl: './buscar-producto.css'
})
export class BuscarProducto {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  terminoBusqueda: string = '';

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productos = this.productoService.getProductos();
    this.productosFiltrados = [...this.productos];
  }

  buscarProducto() {
    if (this.terminoBusqueda.trim() === '') {
      this.productosFiltrados = [...this.productos];
    } else {
      this.productosFiltrados = this.productoService.buscarProductos(this.terminoBusqueda);
    }
  }

  editarProducto(id: number | undefined) {
    if (id) {
      this.router.navigate(['/editar-producto', id]);
    }
  }
}
