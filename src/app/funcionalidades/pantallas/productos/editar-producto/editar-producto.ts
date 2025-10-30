import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../../services/producto.service';
import { Producto } from '../../../../models/producto';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export class EditarProducto implements OnInit {
  producto: Producto = {
    nombre: '',
    precio: 0,
    costo: 0,
    detalles: '',
    cantidad: 0
  };

  productoId: number = 0;
  imagenPreview: string | null = null;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productoId = +params['id'];
      this.cargarProducto();
    });
  }

  cargarProducto() {
    const productoEncontrado = this.productoService.getProductoById(this.productoId);
    if (productoEncontrado) {
      this.producto = { ...productoEncontrado };
    } else {
      alert('Producto no encontrado');
      this.router.navigate(['/buscar-producto']);
    }
  }

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

  guardarCambios() {
    if (this.validarProducto()) {
      const resultado = this.productoService.updateProducto(this.productoId, this.producto);
      if (resultado) {
        alert('Producto actualizado exitosamente');
        this.router.navigate(['/buscar-producto']);
      } else {
        alert('Error al actualizar el producto');
      }
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

  eliminarProducto() {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      const resultado = this.productoService.deleteProducto(this.productoId);
      if (resultado) {
        alert('Producto eliminado exitosamente');
        this.router.navigate(['/buscar-producto']);
      } else {
        alert('Error al eliminar el producto');
      }
    }
  }
}
