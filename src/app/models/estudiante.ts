
export class Estudiante {
  idEstudiante?: number; // Se llena automáticamente, no modificable
  nombre?: string; // Obligatorio
  curso?: string; // Obligatorio
  documentoRepresentante?: string; // No obligatorio
  correo?: string; // No obligatorio
  telefono?: string; // No obligatorio
  saldo?: number; // Saldo TOTAL del estudiante (suma de saldos personalizados)
  saldosPersonalizados?: Record<string, number>; // Mapa de saldos personalizados (cajas)
  fechaRegistro?: Date; // Se llena automáticamente, no modificable
  restricciones?: number[]; // Array de IDs de productos restringidos

  get nombreCompleto(): string {
    return `${this.nombre} (${this.curso})`;
  }

  get saldoFormateado(): string {
    return `$${this.saldo?.toLocaleString('es-CO') || 0}`;
  }
  
  constructor(data?: Partial<Estudiante>) {
    if (data) {
      Object.assign(this, data);
    }
    
    // Inicializar arrays y objetos vacíos si no se proporcionan
    this.saldosPersonalizados = this.saldosPersonalizados || {};
    this.restricciones = this.restricciones || [];
  }
}