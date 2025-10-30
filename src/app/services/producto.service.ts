import { Producto } from "../models/producto";
import { Venta } from "../models/venta";


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[];

  constructor() {
    this.productos = [
      {
        idProducto: 1,
        nombre: 'Café Americano',
        detalles: 'Café negro recién hecho, tamaño mediano 8oz',
        precio: 5000,
    costo: 2200,
    cantidad: 100,
    fechaCreacion: new Date('2025-02-15'),
    activo: true
  },
  {
    idProducto: 2,
    nombre: 'Cappuccino',
    detalles: 'Espresso con leche espumada y un toque de canela',
    precio: 7500,
    costo: 3200,
    cantidad: 80,
    fechaCreacion: new Date('2025-01-28'),
    activo: true
  },
  {
    idProducto: 3,
    nombre: 'Sándwich de Pollo',
    detalles: 'Pan integral, pollo a la plancha, lechuga, tomate y mayonesa',
    precio: 12000,
    costo: 5800,
    cantidad: 25,
    fechaCreacion: new Date('2025-03-05'),
    activo: true
  },
  {
    idProducto: 4,
    nombre: 'Croissant de Jamón y Queso',
    detalles: 'Croissant horneado con jamón y queso derretido',
    precio: 8500,
    costo: 4200,
    cantidad: 30,
    fechaCreacion: new Date('2025-02-20'),
    activo: true
  },
  {
    idProducto: 5,
    nombre: 'Jugo de Naranja Natural',
    detalles: 'Exprimido al momento, 350ml',
    precio: 6500,
    costo: 3500,
    cantidad: 40,
    fechaCreacion: new Date('2025-03-10'),
    activo: true
  },
  {
    idProducto: 6,
    nombre: 'Galletas de Chispas de Chocolate',
    detalles: 'Paquete de 3 unidades, recién horneadas',
    precio: 4500,
    costo: 2000,
    cantidad: 45,
    fechaCreacion: new Date('2025-01-15'),
    activo: true
  },
  {
    idProducto: 7,
    nombre: 'Ensalada César',
    detalles: 'Lechuga, pollo, crutones, queso parmesano y aderezo César',
    precio: 15000,
    costo: 7800,
    cantidad: 15,
    fechaCreacion: new Date('2025-03-18'),
    activo: true
  },
  {
    idProducto: 8,
    nombre: 'Té Verde',
    detalles: 'Infusión de té verde, servido caliente o frío',
    precio: 4800,
    costo: 1800,
    cantidad: 90,
    fechaCreacion: new Date('2025-02-05'),
    activo: true
  },
  {
    idProducto: 9,
    nombre: 'Muffin de Arándanos',
    detalles: 'Muffin esponjoso con arándanos frescos',
    precio: 5500,
    costo: 2500,
    cantidad: 35,
    fechaCreacion: new Date('2025-03-22'),
    activo: true
  },
  {
    idProducto: 10,
    nombre: 'Brownie de Chocolate',
    detalles: 'Brownie húmedo con nueces y chocolate belga',
    precio: 6800,
    costo: 3100,
    cantidad: 20,
    fechaCreacion: new Date('2025-02-28'),
    activo: true
  },
  {
    idProducto: 11,
    nombre: 'Latte Caramelo',
    detalles: 'Espresso con leche y jarabe de caramelo',
    precio: 9000,
    costo: 3900,
    cantidad: 75,
    fechaCreacion: new Date('2025-01-10'),
    activo: true
  },
  {
    idProducto: 12,
    nombre: 'Agua Mineral',
    detalles: 'Botella de 500ml',
    precio: 3500,
    costo: 1200,
    cantidad: 120,
    fechaCreacion: new Date('2025-01-05'),
    activo: true
  },
  {
    idProducto: 13,
    nombre: 'Combo Desayuno',
    detalles: 'Café americano, jugo de naranja y croissant',
    precio: 17500,
    costo: 9200,
    cantidad: 18,
    fechaCreacion: new Date('2025-03-01'),
    activo: true
  },
  {
    idProducto: 14,
    nombre: 'Empanada de Carne',
    detalles: 'Empanada horneada rellena de carne molida y especias',
    precio: 6500,
    costo: 3200,
    cantidad: 22,
    fechaCreacion: new Date('2025-02-25'),
    activo: true
  },
  {
    idProducto: 15,
    nombre: 'Frapuccino de Vainilla',
    detalles: 'Café frío batido con helado de vainilla y leche',
    precio: 10500,
    costo: 4800,
    cantidad: 30,
    fechaCreacion: new Date('2025-01-20'),
    activo: false
  }
];
  }

  getProductos(): Producto[] {
    return this.productos;
  }

  getProductoById(id: number): Producto | undefined {
    return this.productos.find(p => p.idProducto === id);
  }

  createProducto(producto: Producto): Producto {
    const newId = this.productos.length > 0 
      ? Math.max(...this.productos.map(p => p.idProducto || 0)) + 1 
      : 1;
    
    const nuevoProducto: Producto = {
      ...producto,
      idProducto: newId,
      fechaCreacion: new Date(),
      activo: true
    };
    
    this.productos.push(nuevoProducto);
    return nuevoProducto;
  }

  updateProducto(id: number, producto: Producto): Producto | undefined {
    const index = this.productos.findIndex(p => p.idProducto === id);
    if (index !== -1) {
      this.productos[index] = {
        ...this.productos[index],
        ...producto,
        idProducto: id // Mantener el ID original
      };
      return this.productos[index];
    }
    return undefined;
  }

  deleteProducto(id: number): boolean {
    const index = this.productos.findIndex(p => p.idProducto === id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      return true;
    }
    return false;
  }

  buscarProductos(termino: string): Producto[] {
    const terminoLower = termino.toLowerCase();
    return this.productos.filter(p => 
      p.nombre?.toLowerCase().includes(terminoLower) ||
      p.detalles?.toLowerCase().includes(terminoLower)
    );
  }
}
