import { Injectable } from '@angular/core';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private proveedores: Proveedor[] = [];

  constructor() {
    // Inicializar proveedores
    this.inicializarProveedores();
  }

  private inicializarProveedores() {
    // Proveedor 1
    const proveedor1 = new Proveedor();
    proveedor1.idProvedor = 1;
    proveedor1.nombre = 'Cafés del Valle';
    proveedor1.correo = 'contacto@cafesdelvalle.com';
    proveedor1.telefono = '300-123-4567';
    proveedor1.productos = [1, 2, 8, 11, 15]; // Productos de café y té
    this.proveedores.push(proveedor1);
    
    // Proveedor 2
    const proveedor2 = new Proveedor();
    proveedor2.idProvedor = 2;
    proveedor2.nombre = 'Panadería El Trigo';
    proveedor2.correo = 'pedidos@panaderiaeltrigo.com';
    proveedor2.telefono = '315-987-6543';
    proveedor2.productos = [4, 6, 9, 10, 14]; // Productos de panadería
    this.proveedores.push(proveedor2);
    
    // Proveedor 3
    const proveedor3 = new Proveedor();
    proveedor3.idProvedor = 3;
    proveedor3.nombre = 'Frutas y Verduras Orgánicas';
    proveedor3.correo = 'info@frutasorganicas.com';
    proveedor3.telefono = '320-456-7890';
    proveedor3.productos = [5, 7]; // Productos frescos
    this.proveedores.push(proveedor3);
    
    // Proveedor 4
    const proveedor4 = new Proveedor();
    proveedor4.idProvedor = 4;
    proveedor4.nombre = 'Distribuidora de Bebidas Frescas';
    proveedor4.correo = 'ventas@bebidasfrescas.com';
    proveedor4.telefono = '310-234-5678';
    proveedor4.productos = [12]; // Aguas y bebidas
    this.proveedores.push(proveedor4);
    
    // Proveedor 5
    const proveedor5 = new Proveedor();
    proveedor5.idProvedor = 5;
    proveedor5.nombre = 'Alimentos Gourmet Premium';
    proveedor5.correo = 'contacto@gourmetpremium.com';
    proveedor5.telefono = '305-678-9012';
    proveedor5.productos = [3, 13]; // Productos gourmet
    this.proveedores.push(proveedor5);
  }

  getProveedores(): Proveedor[] {
    return this.proveedores;
  }
}
