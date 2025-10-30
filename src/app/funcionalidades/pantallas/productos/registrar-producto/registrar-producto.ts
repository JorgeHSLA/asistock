import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../../services/producto.service';
import { Producto } from '../../../../models/producto';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-producto.html',
  styleUrl: './registrar-producto.css'
})
export class RegistrarProducto {
  producto: Producto = {
    nombre: '',
    precio: 0,
    costo: 0,
    detalles: '',
    cantidad: 0
  };

  imagenPreview: string | null = null;

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  crearProducto() {
    if (this.validarProducto()) {
      this.productoService.createProducto(this.producto);
      alert('Producto creado exitosamente');
      this.router.navigate(['/home']);
    }
  }

  validarProducto(): boolean {
    if (!this.producto.nombre || this.producto.nombre.trim() === '') {
      alert('Por favor ingrese el nombre del producto');
      return false;
    }
    if (!this.producto.precio || this.producto.precio <= 0) {
      alert('Por favor ingrese un precio válido');
      return false;
    }
    if (!this.producto.costo || this.producto.costo <= 0) {
      alert('Por favor ingrese un costo válido');
      return false;
    }
    if (!this.producto.cantidad || this.producto.cantidad < 0) {
      alert('Por favor ingrese una cantidad válida');
      return false;
    }
    return true;
  }

  limpiar() {
    this.producto = {
      nombre: '',
      precio: 0,
      costo: 0,
      detalles: '',
      cantidad: 0
    };
    this.imagenPreview = null;
  }
}
