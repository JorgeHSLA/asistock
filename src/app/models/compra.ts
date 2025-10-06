export class Compra {
    idCompra?: number;     
    fecha?: Date;
    idProveedor?: number;
    nombreProveedor?: string;
    metodoPago?: string;  
    total?: number;  
    productosComprados?: Record<number, number>; // id producto y su cantidad

    // Getter para un atributo compuesto, similar a Venta
    get nombreCompra(): string {
      return `Compra #${this.idCompra} - ${this.nombreProveedor || 'Proveedor ' + this.idProveedor}`;
    }
    
    constructor(data?: Partial<Compra>) {
      if (data) {
        Object.assign(this, data);
      }
    }
}

