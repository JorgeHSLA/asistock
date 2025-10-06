import { Compra } from "../models/compra";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private compras: Compra[];

  constructor() {
    this.compras = [
      new Compra({
        idCompra: 1,
        fecha: new Date('2025-03-05T09:30:00'),
        idProveedor: 1,
        nombreProveedor: "Cafés del Valle",
        metodoPago: "Transferencia",
        total: 450000,
        productosComprados: {
          1: 50, // 50 unidades de Café Americano
          2: 30, // 30 unidades de Cappuccino
          11: 25 // 25 unidades de Latte Caramelo
        }
      }),
      new Compra({
        idCompra: 2,
        fecha: new Date('2025-03-07T14:15:00'),
        idProveedor: 2,
        nombreProveedor: "Panadería El Trigal",
        metodoPago: "Crédito a 30 días",
        total: 320000,
        productosComprados: {
          4: 40, // 40 unidades de Croissant
          9: 35, // 35 unidades de Muffin de Arándanos
          10: 30 // 30 unidades de Brownie de Chocolate
        }
      }),
      new Compra({
        idCompra: 3,
        fecha: new Date('2025-03-08T10:45:00'),
        idProveedor: 3,
        nombreProveedor: "Distribuidora Frescos",
        metodoPago: "Transferencia",
        total: 175000,
        productosComprados: {
          5: 40, // 40 unidades de Jugo de Naranja
          12: 100 // 100 unidades de Agua Mineral
        }
      }),
      new Compra({
        idCompra: 4,
        fecha: new Date('2025-03-10T11:20:00'),
        idProveedor: 4,
        nombreProveedor: "Empacados y Snacks",
        metodoPago: "Efectivo",
        total: 230000,
        productosComprados: {
          6: 100, // 100 paquetes de Galletas
          14: 80 // 80 unidades de Empanada
        }
      }),
      new Compra({
        idCompra: 5,
        fecha: new Date('2025-03-12T15:30:00'),
        idProveedor: 5,
        nombreProveedor: "Delicatessen Gourmet",
        metodoPago: "Crédito a 15 días",
        total: 380000,
        productosComprados: {
          3: 50, // 50 unidades de Sándwich de Pollo
          7: 35 // 35 unidades de Ensalada César
        }
      }),
      new Compra({
        idCompra: 6,
        fecha: new Date('2025-03-15T09:00:00'),
        idProveedor: 1,
        nombreProveedor: "Cafés del Valle",
        metodoPago: "Transferencia",
        total: 520000,
        productosComprados: {
          1: 60, // 60 unidades de Café Americano
          2: 40, // 40 unidades de Cappuccino
          8: 45, // 45 unidades de Té Verde
          15: 35 // 35 unidades de Frappuccino
        }
      }),
      new Compra({
        idCompra: 7,
        fecha: new Date('2025-03-18T13:45:00'),
        idProveedor: 2,
        nombreProveedor: "Panadería El Trigal",
        metodoPago: "Efectivo",
        total: 290000,
        productosComprados: {
          4: 50, // 50 unidades de Croissant
          10: 40 // 40 unidades de Brownie de Chocolate
        }
      }),
      new Compra({
        idCompra: 8,
        fecha: new Date('2025-03-20T10:15:00'),
        idProveedor: 6,
        nombreProveedor: "Distribuidora Lácteos",
        metodoPago: "Transferencia",
        total: 185000,
        productosComprados: {
          2: 35, // 35 unidades de Cappuccino (insumos lácteos)
          15: 40 // 40 unidades de Frappuccino (insumos lácteos)
        }
      }),
      new Compra({
        idCompra: 9,
        fecha: new Date('2025-03-23T14:30:00'),
        idProveedor: 3,
        nombreProveedor: "Distribuidora Frescos",
        metodoPago: "Crédito a 30 días",
        total: 210000,
        productosComprados: {
          5: 60, // 60 unidades de Jugo de Naranja
          12: 120 // 120 unidades de Agua Mineral
        }
      }),
      new Compra({
        idCompra: 10,
        fecha: new Date('2025-03-25T11:00:00'),
        idProveedor: 7,
        nombreProveedor: "Provisiones Express",
        metodoPago: "Transferencia",
        total: 340000,
        productosComprados: {
          3: 40, // 40 unidades de Sándwich de Pollo
          6: 80, // 80 paquetes de Galletas
          14: 60 // 60 unidades de Empanada
        }
      }),
      new Compra({
        idCompra: 11,
        fecha: new Date('2025-03-28T09:45:00'),
        idProveedor: 5,
        nombreProveedor: "Delicatessen Gourmet",
        metodoPago: "Efectivo",
        total: 410000,
        productosComprados: {
          3: 55, // 55 unidades de Sándwich de Pollo
          7: 40, // 40 unidades de Ensalada César
          13: 30 // 30 unidades de Combo Desayuno
        }
      }),
      new Compra({
        idCompra: 12,
        fecha: new Date('2025-03-30T15:15:00'),
        idProveedor: 1,
        nombreProveedor: "Cafés del Valle",
        metodoPago: "Crédito a 15 días",
        total: 480000,
        productosComprados: {
          1: 55, // 55 unidades de Café Americano
          11: 45, // 45 unidades de Latte Caramelo
          8: 50 // 50 unidades de Té Verde
        }
      }),
      new Compra({
        idCompra: 13,
        fecha: new Date('2025-04-02T10:30:00'),
        idProveedor: 4,
        nombreProveedor: "Empacados y Snacks",
        metodoPago: "Transferencia",
        total: 260000,
        productosComprados: {
          6: 120, // 120 paquetes de Galletas
          14: 90 // 90 unidades de Empanada
        }
      }),
      new Compra({
        idCompra: 14,
        fecha: new Date('2025-04-05T13:00:00'),
        idProveedor: 2,
        nombreProveedor: "Panadería El Trigal",
        metodoPago: "Efectivo",
        total: 350000,
        productosComprados: {
          4: 60, // 60 unidades de Croissant
          9: 50, // 50 unidades de Muffin de Arándanos
          10: 45 // 45 unidades de Brownie de Chocolate
        }
      }),
      new Compra({
        idCompra: 15,
        fecha: new Date('2025-04-08T14:45:00'),
        idProveedor: 8,
        nombreProveedor: "Insumos Orgánicos",
        metodoPago: "Transferencia",
        total: 295000,
        productosComprados: {
          5: 55, // 55 unidades de Jugo de Naranja (orgánico)
          7: 45 // 45 unidades de Ensalada César (insumos orgánicos)
        }
      })
    ];
  }

  getCompras(): Compra[] {
    return this.compras;
  }
}