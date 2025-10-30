import { Venta } from "../models/venta";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private ventas: Venta[];

  constructor() {
    this.ventas = [
    new Venta({
      idVenta: 1,
      fecha: new Date('2025-03-10T08:45:30'),
      idEstudiante: 101,
      nombreEstudiante: "Carlos Rodríguez",
      cursoEstudiante: "10-A",
      metodoPago: "Efectivo",
      valorExtra: 0,
      total: 15500,
      productosVendidos: {
        1: 2, // 2 Cafés Americanos
        4: 1, // 1 Croissant
        12: 1 // 1 Agua Mineral
      }
    }),
    new Venta({
      idVenta: 2,
      fecha: new Date('2025-03-10T09:15:22'),
      idEstudiante: 203,
      nombreEstudiante: "Laura González",
      cursoEstudiante: "11-B",
      metodoPago: "Tarjeta",
      valorExtra: 500,
      total: 13500,
      productosVendidos: {
        2: 1, // 1 Cappuccino
        9: 1 // 1 Muffin de Arándanos
      }
    }),
    new Venta({
      idVenta: 3,
      fecha: new Date('2025-03-10T10:30:45'),
      idEstudiante: 156,
      nombreEstudiante: "Andrés Martínez",
      cursoEstudiante: "9-C",
      metodoPago: "Saldo",
      valorExtra: 0,
      total: 23000,
      productosVendidos: {
        3: 1, // 1 Sándwich de Pollo
        5: 1, // 1 Jugo de Naranja
        6: 2 // 2 paquetes de Galletas
      }
    }),
    new Venta({
      idVenta: 4,
      fecha: new Date('2025-03-10T11:05:18'),
      idEstudiante: 78,
      nombreEstudiante: "Sofía Ramírez",
      cursoEstudiante: "8-A",
      metodoPago: "Efectivo",
      valorExtra: 1000,
      total: 17500,
      productosVendidos: {
        13: 1 // 1 Combo Desayuno
      }
    }),
    new Venta({
      idVenta: 5,
      fecha: new Date('2025-03-10T12:20:07'),
      idEstudiante: 125,
      nombreEstudiante: "Miguel Ángel López",
      cursoEstudiante: "11-A",
      metodoPago: "Saldo",
      valorExtra: 0,
      total: 18000,
      productosVendidos: {
        7: 1, // 1 Ensalada César
        12: 1 // 1 Agua Mineral
      }
    }),
    new Venta({
      idVenta: 6,
      fecha: new Date('2025-03-10T13:15:30'),
      idEstudiante: 211,
      nombreEstudiante: "Valentina Castro",
      cursoEstudiante: "10-B",
      metodoPago: "Efectivo",
      valorExtra: 0,
      total: 19500,
      productosVendidos: {
        3: 1, // 1 Sándwich de Pollo
        11: 1 // 1 Latte Caramelo
      }
    }),
    new Venta({
      idVenta: 7,
      fecha: new Date('2025-03-11T08:10:15'),
      idEstudiante: 101,
      nombreEstudiante: "Carlos Rodríguez",
      cursoEstudiante: "10-A",
      metodoPago: "Saldo",
      valorExtra: 0,
      total: 11000,
      productosVendidos: {
        11: 1, // 1 Latte Caramelo
        10: 1 // 1 Brownie de Chocolate
      }
    }),
    new Venta({
      idVenta: 8,
      fecha: new Date('2025-03-11T09:45:22'),
      idEstudiante: 178,
      nombreEstudiante: "Daniela Hernández",
      cursoEstudiante: "9-B",
      metodoPago: "Tarjeta",
      valorExtra: 2000,
      total: 16500,
      productosVendidos: {
        14: 1, // 1 Empanada
        15: 1 // 1 Frapuccino
      }
    }),
    new Venta({
      idVenta: 9,
      fecha: new Date('2025-03-11T10:30:55'),
      idEstudiante: 203,
      nombreEstudiante: "Laura González",
      cursoEstudiante: "11-B",
      metodoPago: "Tarjeta",
      valorExtra: 0,
      total: 25500,
      productosVendidos: {
        2: 1, // 1 Cappuccino
        3: 1, // 1 Sándwich de Pollo
        6: 2 // 2 paquetes de Galletas
      }
    }),
    new Venta({
      idVenta: 10,
      fecha: new Date('2025-03-11T11:25:40'),
      idEstudiante: 156,
      nombreEstudiante: "Andrés Martínez",
      cursoEstudiante: "9-C",
      metodoPago: "Efectivo",
      valorExtra: 0,
      total: 17000,
      productosVendidos: {
        4: 2 // 2 Croissants
      }
    }),
    new Venta({
      idVenta: 11,
      fecha: new Date('2025-03-11T12:40:12'),
      idEstudiante: 125,
      nombreEstudiante: "Miguel Ángel López",
      cursoEstudiante: "11-A",
      metodoPago: "Saldo",
      valorExtra: 1500,
      total: 21500,
      productosVendidos: {
        11: 1, // 1 Latte Caramelo
        3: 1 // 1 Sándwich de Pollo
      }
    }),
    new Venta({
      idVenta: 12,
      fecha: new Date('2025-03-12T08:30:25'),
      idEstudiante: 78,
      nombreEstudiante: "Sofía Ramírez",
      cursoEstudiante: "8-A",
      metodoPago: "Tarjeta",
      valorExtra: 0,
      total: 9000,
      productosVendidos: {
        1: 1, // 1 Café Americano
        9: 1 // 1 Muffin de Arándanos
      }
    }),
    new Venta({
      idVenta: 13,
      fecha: new Date('2025-03-12T09:50:18'),
      idEstudiante: 211,
      nombreEstudiante: "Valentina Castro",
      cursoEstudiante: "10-B",
      metodoPago: "Efectivo",
      valorExtra: 0,
      total: 28000,
      productosVendidos: {
        13: 1, // 1 Combo Desayuno
        10: 1, // 1 Brownie de Chocolate
        12: 1 // 1 Agua Mineral
      }
    }),
    new Venta({
      idVenta: 14,
      fecha: new Date('2025-03-12T10:45:30'),
      idEstudiante: 178,
      nombreEstudiante: "Daniela Hernández",
      cursoEstudiante: "9-B",
      metodoPago: "Saldo",
      valorExtra: 0,
      total: 13000,
      productosVendidos: {
        14: 2 // 2 Empanadas
      }
    }),
    new Venta({
      idVenta: 15,
      fecha: new Date('2025-03-12T12:05:50'),
      idEstudiante: 101,
      nombreEstudiante: "Carlos Rodríguez",
      cursoEstudiante: "10-A",
      metodoPago: "Tarjeta",
      valorExtra: 2000,
      total: 31000,
      productosVendidos: {
        7: 1, // 1 Ensalada César
        5: 1, // 1 Jugo de Naranja
        8: 1 // 1 Té Verde
      }
    })
    ];
  }

  getVentas(): Venta[] {
    return this.ventas;
  }

  agregarVenta(venta: Venta): void {
    // Obtener el último ID y asignar el siguiente
    const ultimoId = this.ventas.length > 0 
      ? Math.max(...this.ventas.map(v => v.idVenta || 0))
      : 0;
    venta.idVenta = ultimoId + 1;
    this.ventas.push(venta);
  }
}
