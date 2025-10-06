export class Venta {
    idVenta?: number     
    fecha?:Date
    idEstudiante?:number 
    nombreEstudiante?:String  
    cursoEstudiante?:String  
    metodoPago?:String  
    valorExtra?:number  
    total?:number  
    productosVendidos?: Record<number, number>; // id producto y su cantidad

      // Getter para un atributo compuesto
  get nombreVenta(): string {
    return `Venta #${this.idVenta} - ${this.nombreEstudiante}`;
  }
  // También puedes usar un constructor para inicializar
  constructor(data: Partial<Venta>) {
    Object.assign(this, data);
  }
  
}
