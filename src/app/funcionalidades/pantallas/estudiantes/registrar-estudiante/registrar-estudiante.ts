import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../../../../services/estudiante.service';
import { Estudiante } from '../../../../models/estudiante';

@Component({
  selector: 'app-registrar-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-estudiante.html',
  styleUrl: './registrar-estudiante.css'
})
export class RegistrarEstudiante {
  estudiante: Estudiante = new Estudiante({
    nombre: '',
    curso: '',
    documentoRepresentante: '',
    correo: '',
    telefono: '',
    saldo: 0
  });

  imagenPreview: string | null = null;

  constructor(
    private estudianteService: EstudianteService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarEstudiante() {
    if (this.validarEstudiante()) {
      this.estudianteService.createEstudiante(this.estudiante);
      alert('Estudiante registrado exitosamente');
      this.router.navigate(['/home']);
    }
  }

  validarEstudiante(): boolean {
    if (!this.estudiante.nombre || this.estudiante.nombre.trim() === '') {
      alert('Por favor ingrese el nombre del estudiante');
      return false;
    }
    return true;
  }

  limpiar() {
    this.estudiante = new Estudiante({
      nombre: '',
      curso: '',
      documentoRepresentante: '',
      correo: '',
      telefono: '',
      saldo: 0
    });
    this.imagenPreview = null;
  }
}
