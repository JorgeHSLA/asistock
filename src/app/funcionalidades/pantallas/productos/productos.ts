import { Component } from '@angular/core';
import { Navbar } from '../../../funcionalidades/navbar/navbar';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto';
import { CommonModule, DatePipe } from '@angular/common';
import { UsuarioData } from '../../usuario-data/usuario-data';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [Navbar, CommonModule, UsuarioData],
  providers: [DatePipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  productos: Producto[] = [];
  selectedProducto: Producto | null = null;

  productosAdaptados: any[] = [];

  constructor(private productoService: ProductoService) {
    // Obtener los productos del servicio
    this.productos = this.productoService.getProductos();
    
    // Adaptar la estructura de los productos para que sea compatible con el navbar
    this.productosAdaptados = this.productos.map(producto => ({
      id: producto.idProducto,
      username: producto.nombre,
      // Mantenemos una referencia al producto original
      original: producto
    }));
  }

  onUserSelected(objetoSeleccionado: any) {
    if (!objetoSeleccionado) {
      return null;
    }
    
    console.log('Objeto seleccionado:', objetoSeleccionado);
    
    // Si el objeto tiene la propiedad 'original', es el objeto adaptado del navbar
    if (objetoSeleccionado.original) {
      this.selectedProducto = objetoSeleccionado.original;
      console.log('Producto seleccionado:', this.selectedProducto);
      return this.selectedProducto;
    } 
    // Si no tiene 'original', puede ser el objeto en sí
    else {
      const productoSeleccionado = this.productos.find(p => p.idProducto === objetoSeleccionado.id);
      if (productoSeleccionado) {
        this.selectedProducto = productoSeleccionado;
        console.log('Producto encontrado por ID:', productoSeleccionado);
        return productoSeleccionado;
      }
    }
    
    return this.selectedProducto;
  } 
}
