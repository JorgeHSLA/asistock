export class Producto {
  idProducto?: number;
  nombre?: string;
  detalles?: string;
  precio?: number;
  costo?: number; // Costo por unidad para métricas
  cantidad?: number;
  fechaCreacion?: Date; // En TypeScript usamos Date en lugar de LocalDate
  activo?: boolean;

}

