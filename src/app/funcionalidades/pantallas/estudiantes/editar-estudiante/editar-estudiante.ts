import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../../../../services/estudiante.service';
import { Estudiante } from '../../../../models/estudiante';

@Component({
  selector: 'app-editar-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-estudiante.html',
  styleUrl: './editar-estudiante.css'
})
export class EditarEstudiante implements OnInit {
  estudiante: Estudiante = new Estudiante({
    nombre: '',
    curso: '',
    documentoRepresentante: '',
    correo: '',
    telefono: '',
    saldo: 0
  });

  estudianteId: number = 0;
  imagenPreview: string | null = null;

  constructor(
    private estudianteService: EstudianteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.estudianteId = +params['id'];
      this.cargarEstudiante();
    });
  }

  cargarEstudiante() {
    const estudianteEncontrado = this.estudianteService.getEstudianteById(this.estudianteId);
    if (estudianteEncontrado) {
      this.estudiante = new Estudiante({ ...estudianteEncontrado });
    } else {
      alert('Estudiante no encontrado');
      this.router.navigate(['/buscar-estudiante']);
    }
  }

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

  guardarCambios() {
    if (this.validarEstudiante()) {
      const resultado = this.estudianteService.updateEstudiante(this.estudianteId, this.estudiante);
      if (resultado) {
        alert('Estudiante actualizado exitosamente');
        this.router.navigate(['/buscar-estudiante']);
      } else {
        alert('Error al actualizar el estudiante');
      }
    }
  }

  validarEstudiante(): boolean {
    if (!this.estudiante.nombre || this.estudiante.nombre.trim() === '') {
      alert('Por favor ingrese el nombre del estudiante');
      return false;
    }
    return true;
  }

  eliminarEstudiante() {
    if (confirm('¿Está seguro de que desea eliminar este estudiante?')) {
      const resultado = this.estudianteService.deleteEstudiante(this.estudianteId);
      if (resultado) {
        alert('Estudiante eliminado exitosamente');
        this.router.navigate(['/buscar-estudiante']);
      } else {
        alert('Error al eliminar el estudiante');
      }
    }
  }
}
