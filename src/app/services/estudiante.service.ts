import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private estudiantes: Estudiante[];

  constructor() {
    this.estudiantes = [
      new Estudiante({
        idEstudiante: 1,
        nombre: 'Juan Pérez',
        curso: '10A',
        documentoRepresentante: '1234567890',
        correo: 'juan.perez@example.com',
        telefono: '3001234567',
        saldo: 50000,
        saldosPersonalizados: { 'Caja1': 50000 },
        fechaRegistro: new Date('2024-01-15'),
        restricciones: []
      }),
      new Estudiante({
        idEstudiante: 2,
        nombre: 'María González',
        curso: '11B',
        documentoRepresentante: '0987654321',
        correo: 'maria.gonzalez@example.com',
        telefono: '3009876543',
        saldo: 75000,
        saldosPersonalizados: { 'Caja1': 75000 },
        fechaRegistro: new Date('2024-02-20'),
        restricciones: []
      }),
      new Estudiante({
        idEstudiante: 3,
        nombre: 'Carlos Rodríguez',
        curso: '9C',
        documentoRepresentante: '1122334455',
        correo: 'carlos.rodriguez@example.com',
        telefono: '3001122334',
        saldo: 35000,
        saldosPersonalizados: { 'Caja1': 35000 },
        fechaRegistro: new Date('2024-03-10'),
        restricciones: []
      }),
      new Estudiante({
        idEstudiante: 4,
        nombre: 'Ana López',
        curso: '10C',
        documentoRepresentante: '5544332211',
        correo: 'ana.lopez@example.com',
        telefono: '3005544332',
        saldo: 90000,
        saldosPersonalizados: { 'Caja1': 90000 },
        fechaRegistro: new Date('2023-12-05'),
        restricciones: []
      }),
      new Estudiante({
        idEstudiante: 5,
        nombre: 'Pedro Martínez',
        curso: '11A',
        documentoRepresentante: '6677889900',
        correo: 'pedro.martinez@example.com',
        telefono: '3006677889',
        saldo: 62000,
        saldosPersonalizados: { 'Caja1': 62000 },
        fechaRegistro: new Date('2024-01-28'),
        restricciones: []
      })
    ];
  }

  getEstudiantes(): Estudiante[] {
    return this.estudiantes;
  }

  getEstudianteById(id: number): Estudiante | undefined {
    return this.estudiantes.find(e => e.idEstudiante === id);
  }

  createEstudiante(estudiante: Estudiante): Estudiante {
    const newId = this.estudiantes.length > 0 
      ? Math.max(...this.estudiantes.map(e => e.idEstudiante || 0)) + 1 
      : 1;
    
    const nuevoEstudiante = new Estudiante({
      ...estudiante,
      idEstudiante: newId,
      fechaRegistro: new Date(),
      saldo: 0,
      saldosPersonalizados: {},
      restricciones: []
    });
    
    this.estudiantes.push(nuevoEstudiante);
    return nuevoEstudiante;
  }

  updateEstudiante(id: number, estudiante: Estudiante): Estudiante | undefined {
    const index = this.estudiantes.findIndex(e => e.idEstudiante === id);
    if (index !== -1) {
      const actualizado = new Estudiante({
        ...this.estudiantes[index],
        ...estudiante,
        idEstudiante: id // Mantener el ID original
      });
      this.estudiantes[index] = actualizado;
      return this.estudiantes[index];
    }
    return undefined;
  }

  deleteEstudiante(id: number): boolean {
    const index = this.estudiantes.findIndex(e => e.idEstudiante === id);
    if (index !== -1) {
      this.estudiantes.splice(index, 1);
      return true;
    }
    return false;
  }

  buscarEstudiantes(termino: string): Estudiante[] {
    const terminoLower = termino.toLowerCase();
    return this.estudiantes.filter(e => 
      e.nombre?.toLowerCase().includes(terminoLower) ||
      e.curso?.toLowerCase().includes(terminoLower)
    );
  }

  actualizarSaldo(idEstudiante: number, nuevoSaldo: number): boolean {
    const estudiante = this.estudiantes.find(e => e.idEstudiante === idEstudiante);
    if (estudiante) {
      estudiante.saldo = nuevoSaldo;
      return true;
    }
    return false;
  }
}
