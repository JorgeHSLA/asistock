import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlarmaService } from '../../../services/alarma.service';
import { Alarma } from '../../../models/alarma';

@Component({
  selector: 'app-alarmas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alarmas.html',
  styleUrl: './alarmas.css'
})
export class Alarmas {
  alarmas: Alarma[] = [];
  alarmasFiltradas: Alarma[] = [];
  terminoBusqueda: string = '';
  modoEdicion: number | null = null;
  alarmaEditando: Alarma = new Alarma({});

  // Alarmas automáticas del sistema
  alarmasAutomaticas = [
    {
      id: 'auto1',
      descripcion: 'Agregar alarma de Stock de menos de 10 para cualquier producto nuevo que se ingrese',
      activa: true
    },
    {
      id: 'auto2',
      descripcion: 'Agregar alarma de cambio de estado de máquina para cualquier máquina nueva que se ingrese',
      activa: false
    },
    {
      id: 'auto3',
      descripcion: 'Agregar alarma de espacio ocupado al 80 porciento del local',
      activa: true
    }
  ];

  constructor(
    private alarmaService: AlarmaService,
    private router: Router
  ) {
    this.alarmas = this.alarmaService.getAlarmas();
    this.alarmasFiltradas = [...this.alarmas];
  }

  buscarAlarma() {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    
    if (termino === '') {
      this.alarmasFiltradas = [...this.alarmas];
    } else {
      this.alarmasFiltradas = this.alarmas.filter(alarma => 
        alarma.titulo?.toLowerCase().includes(termino) ||
        alarma.descripcion?.toLowerCase().includes(termino)
      );
    }
  }

  editarAlarma(alarma: Alarma) {
    this.modoEdicion = alarma.idAlarma || null;
    this.alarmaEditando = { ...alarma };
  }

  guardarEdicion() {
    if (this.modoEdicion && this.alarmaEditando.idAlarma) {
      this.alarmaService.actualizarAlarma(this.alarmaEditando.idAlarma, this.alarmaEditando);
      this.alarmas = this.alarmaService.getAlarmas();
      this.buscarAlarma();
      this.cancelarEdicion();
    }
  }

  cancelarEdicion() {
    this.modoEdicion = null;
    this.alarmaEditando = new Alarma({});
  }

  eliminarAlarma(idAlarma: number | undefined) {
    if (idAlarma && confirm('¿Estás seguro de eliminar esta alarma?')) {
      this.alarmaService.eliminarAlarma(idAlarma);
      this.alarmas = this.alarmaService.getAlarmas();
      this.buscarAlarma();
    }
  }

  agregarNuevaAlarma() {
    const nuevaAlarma = new Alarma({
      titulo: 'Nueva alarma',
      descripcion: 'Descripción de la alarma',
      activa: true,
      tipo: 'custom'
    });
    
    this.alarmaService.agregarAlarma(nuevaAlarma);
    this.alarmas = this.alarmaService.getAlarmas();
    this.buscarAlarma();
    
    // Activar edición inmediata
    if (nuevaAlarma.idAlarma) {
      this.editarAlarma(nuevaAlarma);
    }
  }

  toggleAlarmaAutomatica(alarmaAuto: any) {
    alarmaAuto.activa = !alarmaAuto.activa;
  }
}
