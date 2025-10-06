import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { Estudiante } from '../../models/estudiante';
import { Venta } from '../../models/venta';
import { Compra } from '../../models/compra';
import { Proveedor } from '../../models/proveedor';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-usuario-data',
  standalone: true,
  imports: [CommonModule, OverlayModule, ReactiveFormsModule],
  templateUrl: './usuario-data.html',
  styleUrl: './usuario-data.css'
})
export class UsuarioData {
  @Input() data: any;
  productos: Producto[] = [];
  
  constructor(private productoService: ProductoService) {
    this.productos = this.productoService.getProductos();
  }

  ngOnChanges() {
    if (this.data) {
      console.log('Datos recibidos:', this.data);
    }
  }

  // Métodos para verificar el tipo de entidad
  isProducto(): boolean {
    return this.data && this.data.idProducto !== undefined;
  }

  isEstudiante(): boolean {
    return this.data && (this.data.idEstudiante !== undefined || this.data.curso !== undefined);
  }

  isVenta(): boolean {
    return this.data && this.data.idVenta !== undefined;
  }

  isCompra(): boolean {
    return this.data && this.data.idCompra !== undefined;
  }

  isProveedor(): boolean {
    return this.data && (this.data.idProvedor !== undefined || this.data.cantidadProductos !== undefined);
  }

  // Obtener el ID según el tipo de objeto
  getIdValue(): number | undefined {
    if (!this.data) return undefined;
    
    if (this.isProducto()) return this.data.idProducto;
    if (this.isEstudiante()) return this.data.idEstudiante;
    if (this.isVenta()) return this.data.idVenta;
    if (this.isCompra()) return this.data.idCompra;
    if (this.isProveedor()) return this.data.idProvedor;
    
    return undefined;
  }

  // Verificar si tiene productos (vendidos o comprados)
  tieneProductos(): boolean {
    if (!this.data) return false;
    
    if (this.isVenta() && this.data.productosVendidos) {
      return this.getObjectKeysLength(this.data.productosVendidos) > 0;
    }
    
    if (this.isCompra() && this.data.productosComprados) {
      return this.getObjectKeysLength(this.data.productosComprados) > 0;
    }
    
    return false;
  }
  
  // Obtener la longitud de las keys de un objeto de forma segura
  getObjectKeysLength(obj: any): number {
    if (!obj) return 0;
    return Object.keys(obj).length;
  }

  // Contar productos en venta o compra
  getProductosCount(): number {
    if (!this.data) return 0;
    
    if (this.isVenta() && this.data.productosVendidos) {
      return this.getObjectKeysLength(this.data.productosVendidos);
    }
    
    if (this.isCompra() && this.data.productosComprados) {
      return this.getObjectKeysLength(this.data.productosComprados);
    }
    
    return 0;
  }
  
  // Obtener los detalles de los productos vendidos o comprados
  getProductosDetalle(): { id: number, nombre: string, cantidad: number, precio?: number, subtotal?: number }[] {
    if (!this.data) return [];
    
    let productosDetalle: { id: number, nombre: string, cantidad: number, precio?: number, subtotal?: number }[] = [];
    
    if (this.isVenta() && this.data.productosVendidos) {
      Object.entries(this.data.productosVendidos).forEach(([idProducto, cantidad]) => {
        const id = Number(idProducto);
        const producto = this.productos.find(p => p.idProducto === id);
        
        if (producto) {
          productosDetalle.push({
            id,
            nombre: producto.nombre || `Producto #${id}`,
            cantidad: cantidad as number,
            precio: producto.precio,
            subtotal: producto.precio ? producto.precio * (cantidad as number) : undefined
          });
        } else {
          productosDetalle.push({
            id,
            nombre: `Producto #${id}`,
            cantidad: cantidad as number
          });
        }
      });
    }
    
    if (this.isCompra() && this.data.productosComprados) {
      Object.entries(this.data.productosComprados).forEach(([idProducto, cantidad]) => {
        const id = Number(idProducto);
        const producto = this.productos.find(p => p.idProducto === id);
        
        if (producto) {
          productosDetalle.push({
            id,
            nombre: producto.nombre || `Producto #${id}`,
            cantidad: cantidad as number,
            precio: producto.costo,
            subtotal: producto.costo ? producto.costo * (cantidad as number) : undefined
          });
        } else {
          productosDetalle.push({
            id,
            nombre: `Producto #${id}`,
            cantidad: cantidad as number
          });
        }
      });
    }
    
    return productosDetalle;
  }
}