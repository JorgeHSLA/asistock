import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../../../../services/estudiante.service';
import { Estudiante } from '../../../../models/estudiante';

@Component({
  selector: 'app-buscar-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-estudiante.html',
  styleUrl: './buscar-estudiante.css'
})
export class BuscarEstudiante {
  estudiantes: Estudiante[] = [];
  estudiantesFiltrados: Estudiante[] = [];
  terminoBusqueda: string = '';

  constructor(
    private estudianteService: EstudianteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.estudiantes = this.estudianteService.getEstudiantes();
    this.estudiantesFiltrados = [...this.estudiantes];
  }

  buscarEstudiante() {
    if (this.terminoBusqueda.trim() === '') {
      this.estudiantesFiltrados = [...this.estudiantes];
    } else {
      this.estudiantesFiltrados = this.estudianteService.buscarEstudiantes(this.terminoBusqueda);
    }
  }

  editarEstudiante(id: number | undefined) {
    if (id) {
      this.router.navigate(['/editar-estudiante', id]);
    }
  }
}
