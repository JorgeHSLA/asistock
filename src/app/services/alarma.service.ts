import { Injectable } from '@angular/core';
import { Alarma } from '../models/alarma';

@Injectable({
  providedIn: 'root'
})
export class AlarmaService {
  private alarmas: Alarma[] = [];
  private nextId = 1;

  // Alarmas predefinidas del sistema
  private alarmasPredefinidas = [
    {
      titulo: 'Stock bajo',
      descripcion: 'Alertar cuando producto X llegue a cierta cantidad',
      tipo: 'stock' as const
    },
    {
      titulo: 'Cambio de estado',
      descripcion: 'Alertar cuando una máquina cambie de estado para cualquier máquina nueva que se ingrese',
      tipo: 'cambio_estado' as const
    },
    {
      titulo: 'Espacio ocupado',
      descripcion: 'Alertar cuando almacén 3 no tenga capacidad del local',
      tipo: 'espacio' as const
    }
  ];

  constructor() {
    // Inicializar con alarmas predefinidas
    this.alarmasPredefinidas.forEach(alarma => {
      this.alarmas.push(new Alarma({
        idAlarma: this.nextId++,
        titulo: alarma.titulo,
        descripcion: alarma.descripcion,
        tipo: alarma.tipo,
        activa: true
      }));
    });
  }

  getAlarmas(): Alarma[] {
    return this.alarmas;
  }

  agregarAlarma(alarma: Alarma): void {
    alarma.idAlarma = this.nextId++;
    this.alarmas.push(alarma);
  }

  actualizarAlarma(idAlarma: number, alarmaActualizada: Partial<Alarma>): void {
    const index = this.alarmas.findIndex(a => a.idAlarma === idAlarma);
    if (index !== -1) {
      this.alarmas[index] = { ...this.alarmas[index], ...alarmaActualizada };
    }
  }

  eliminarAlarma(idAlarma: number): void {
    this.alarmas = this.alarmas.filter(a => a.idAlarma !== idAlarma);
  }

  toggleAlarma(idAlarma: number): void {
    const alarma = this.alarmas.find(a => a.idAlarma === idAlarma);
    if (alarma) {
      alarma.activa = !alarma.activa;
    }
  }
}
