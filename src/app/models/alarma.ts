export class Alarma {
  idAlarma?: number;
  titulo?: string;
  descripcion?: string;
  activa?: boolean;
  tipo?: 'stock' | 'cambio_estado' | 'espacio' | 'custom';

  constructor(data: Partial<Alarma>) {
    Object.assign(this, data);
  }
}
