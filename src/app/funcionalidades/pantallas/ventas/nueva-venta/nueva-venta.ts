import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../../../services/venta.service';
import { ProductoService } from '../../../../services/producto.service';
import { EstudianteService } from '../../../../services/estudiante.service';
import { Venta } from '../../../../models/venta';
import { Producto } from '../../../../models/producto';
import { Estudiante } from '../../../../models/estudiante';

interface ProductoVenta {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-nueva-venta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-venta.html',
  styleUrl: './nueva-venta.css'
})
export class NuevaVenta {
  // Datos de la venta
  ventaFecha: Date = new Date();
  estudiante: Estudiante | null = null;
  nombreCliente: string = '';
  productosVenta: ProductoVenta[] = []; // Iniciar vacío
  
  // Listas disponibles
  estudiantes: Estudiante[] = [];
  productos: Producto[] = [];
  
  // Campos de búsqueda
  busquedaEstudiante: string = '';
  estudiantesFiltrados: Estudiante[] = [];
  mostrarListaEstudiantes: boolean = false;

  constructor(
    private ventaService: VentaService,
    private productoService: ProductoService,
    private estudianteService: EstudianteService,
    private router: Router
  ) {
    this.estudiantes = this.estudianteService.getEstudiantes();
    this.productos = this.productoService.getProductos().filter(p => p.activo);
  }

  // Filtrar estudiantes mientras se escribe
  filtrarEstudiantes() {
    if (this.busquedaEstudiante.trim() === '') {
      this.estudiantesFiltrados = [];
      this.mostrarListaEstudiantes = false;
    } else {
      this.estudiantesFiltrados = this.estudiantes.filter(est =>
        est.nombre?.toLowerCase().includes(this.busquedaEstudiante.toLowerCase())
      );
      this.mostrarListaEstudiantes = true;
    }
  }

  // Seleccionar estudiante
  seleccionarEstudiante(estudiante: Estudiante) {
    this.estudiante = estudiante;
    this.busquedaEstudiante = estudiante.nombre || '';
    this.mostrarListaEstudiantes = false;
  }

  // Obtener el total de la venta
  get totalVenta(): number {
    return this.productosVenta.reduce((total, pv) => {
      if (pv.producto.idProducto && pv.cantidad > 0) {
        return total + (pv.producto.precio || 0) * pv.cantidad;
      }
      return total;
    }, 0);
  }

  // Obtener nombre del producto por ID
  getNombreProducto(idProducto: number): string {
    const producto = this.productos.find(p => p.idProducto === idProducto);
    return producto?.nombre || 'Seleccionar producto';
  }

  // Cambiar producto seleccionado
  onProductoChange(index: number, event: any) {
    const idProducto = parseInt(event.target.value);
    const producto = this.productos.find(p => p.idProducto === idProducto);
    if (producto) {
      this.productosVenta[index].producto = producto;
    }
  }

  // Agregar un nuevo producto vacío
  agregarProducto() {
    this.productosVenta.push({ 
      producto: {} as Producto, 
      cantidad: 0 
    });
  }

  // Eliminar un producto de la lista
  eliminarProducto(index: number) {
    this.productosVenta.splice(index, 1);
  }

  // Incrementar/decrementar cantidad
  cambiarCantidad(index: number, cambio: number) {
    const nuevaCantidad = this.productosVenta[index].cantidad + cambio;
    if (nuevaCantidad >= 0) {
      this.productosVenta[index].cantidad = nuevaCantidad;
    }
  }

  // Limpiar selección de estudiante (para escribir nombre manual)
  limpiarEstudiante() {
    this.estudiante = null;
    this.busquedaEstudiante = '';
    this.mostrarListaEstudiantes = false;
  }

  // Terminar venta
  terminarVenta() {
    // Validaciones
    if (!this.estudiante && this.nombreCliente.trim() === '') {
      alert('Debe seleccionar un estudiante o ingresar el nombre del cliente');
      return;
    }

    const productosVendidos: Record<number, number> = {};
    let tieneProductos = false;

    this.productosVenta.forEach(pv => {
      if (pv.producto.idProducto && pv.cantidad > 0) {
        productosVendidos[pv.producto.idProducto] = pv.cantidad;
        tieneProductos = true;
      }
    });

    if (!tieneProductos) {
      alert('Debe agregar al menos un producto a la venta');
      return;
    }

    // Crear la venta
    const nuevaVenta = new Venta({
      fecha: this.ventaFecha,
      idEstudiante: this.estudiante?.idEstudiante,
      nombreEstudiante: this.estudiante ? this.estudiante.nombre : this.nombreCliente,
      cursoEstudiante: this.estudiante?.curso || 'N/A',
      metodoPago: this.estudiante ? 'Saldo' : 'Efectivo',
      valorExtra: 0,
      total: this.totalVenta,
      productosVendidos: productosVendidos
    });

    // Agregar la venta al servicio
    this.ventaService.agregarVenta(nuevaVenta);

    // Actualizar inventario
    this.productosVenta.forEach(pv => {
      if (pv.producto.idProducto && pv.cantidad > 0) {
        this.productoService.actualizarCantidad(pv.producto.idProducto, -pv.cantidad);
      }
    });

    // Actualizar saldo del estudiante si aplica
    if (this.estudiante && this.estudiante.idEstudiante) {
      const nuevoSaldo = (this.estudiante.saldo || 0) - this.totalVenta;
      this.estudianteService.actualizarSaldo(this.estudiante.idEstudiante, nuevoSaldo);
    }

    alert('Venta registrada exitosamente');
    this.router.navigate(['/ventas']);
  }
}
