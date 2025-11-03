import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Proveedor } from '../../../models/proveedor';
import { ProveedorService } from '../../../services/proveedor.service';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.html',
  styleUrls: [`./proveedores.css`]
})
export class Proveedores {
  proveedores: Proveedor[] = [];
  proveedorActual: Proveedor | null = null;
  indiceActual: number = 0;
  vistaActual: 'carrusel' | 'tabla' = 'carrusel';
  
  // Para modales
  mostrarModalContactar: boolean = false;
  mostrarModalEditar: boolean = false;
  mostrarModalAgregar: boolean = false;
  
  // Proveedor temporal para edición/creación
  proveedorTemp: Proveedor = new Proveedor();
  
  constructor(
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private router: Router
  ) {
    this.proveedores = this.proveedorService.getProveedores();
    if (this.proveedores.length > 0) {
      this.proveedorActual = this.proveedores[0];
    }
  }
  
  cambiarProveedor(direccion: number) {
    this.indiceActual += direccion;
    
    if (this.indiceActual < 0) {
      this.indiceActual = this.proveedores.length - 1;
    } else if (this.indiceActual >= this.proveedores.length) {
      this.indiceActual = 0;
    }
    
    this.proveedorActual = this.proveedores[this.indiceActual];
  }
  
  cambiarVista() {
    this.vistaActual = this.vistaActual === 'carrusel' ? 'tabla' : 'carrusel';
  }
  
  abrirModalContactar() {
    this.mostrarModalContactar = true;
  }
  
  cerrarModalContactar() {
    this.mostrarModalContactar = false;
  }
  
  abrirModalEditar() {
    if (this.proveedorActual) {
      this.proveedorTemp = Object.assign(new Proveedor(), this.proveedorActual);
      this.mostrarModalEditar = true;
    }
  }
  
  cerrarModalEditar() {
    this.mostrarModalEditar = false;
  }
  
  abrirModalAgregar() {
    this.proveedorTemp = new Proveedor();
    this.mostrarModalAgregar = true;
  }
  
  cerrarModalAgregar() {
    this.mostrarModalAgregar = false;
  }
  
  guardarEdicion() {
    if (this.proveedorTemp.idProvedor) {
      this.proveedorService.actualizarProveedor(this.proveedorTemp.idProvedor, this.proveedorTemp);
      this.proveedores = this.proveedorService.getProveedores();
      this.proveedorActual = this.proveedores[this.indiceActual];
      this.cerrarModalEditar();
    }
  }
  
  agregarProveedor() {
    if (this.proveedorTemp.nombre && this.proveedorTemp.nombre.trim() !== '') {
      this.proveedorService.agregarProveedor(this.proveedorTemp);
      this.proveedores = this.proveedorService.getProveedores();
      this.indiceActual = this.proveedores.length - 1;
      this.proveedorActual = this.proveedores[this.indiceActual];
      this.cerrarModalAgregar();
    } else {
      alert('El nombre del proveedor es obligatorio');
    }
  }
  
  getProductosProveedor(): any[] {
    if (!this.proveedorActual || !this.proveedorActual.productos) return [];
    
    return this.proveedorActual.productos.map(idProducto => {
      const producto = this.productoService.getProductoById(idProducto);
      return producto || { idProducto, nombre: 'Producto no encontrado' };
    });
  }
}