

export class Proveedor {
  idProvedor?: number; // Se llena automáticamente, no modificable
  nombre?: string; // Obligatorio
  correo?: string; // No obligatorio
  telefono?: string; // No obligatorio
  productos?: number[]; // Array de IDs de productos del cliente que un proveedor tiene



  get cantidadProductos(): number {
    return this.productos?.length || 0;
  }
  
}