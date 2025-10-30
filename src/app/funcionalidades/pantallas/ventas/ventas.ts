import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../../../funcionalidades/navbar/navbar';
import { VentaService } from '../../../services/venta.service';
import { Venta } from '../../../models/venta';
import { CommonModule, DatePipe } from '@angular/common';
import { UsuarioData } from '../../usuario-data/usuario-data';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [Navbar, CommonModule, UsuarioData],
  providers: [DatePipe],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css'
})
export class Ventas {
  ventas: Venta[] = [];
  selectedVenta: Venta | null = null;

  ventasAdaptadas: any[] = [];

  constructor(
    private ventaService: VentaService,
    private router: Router
  ) {
    // Obtener las ventas del servicio
    this.ventas = this.ventaService.getVentas();
    
    // Adaptar la estructura de las ventas para que sea compatible con el navbar
    this.ventasAdaptadas = this.ventas.map(venta => ({
      id: venta.idVenta,
      username: `Venta #${venta.idVenta} - ${venta.nombreEstudiante}`,
      // Mantenemos una referencia a la venta original
      original: venta
    }));
  }

  onUserSelected(objetoSeleccionado: any) {
    if (!objetoSeleccionado) {
      return null;
    }
    
    console.log('Objeto seleccionado:', objetoSeleccionado);
    
    // Si el objeto tiene la propiedad 'original', es el objeto adaptado del navbar
    if (objetoSeleccionado.original) {
      this.selectedVenta = objetoSeleccionado.original;
      console.log('Venta seleccionada:', this.selectedVenta);
      return this.selectedVenta;
    } 
    // Si no tiene 'original', puede ser el objeto en sí
    else {
      const ventaSeleccionada = this.ventas.find(v => v.idVenta === objetoSeleccionado.id);
      if (ventaSeleccionada) {
        this.selectedVenta = ventaSeleccionada;
        console.log('Venta encontrada por ID:', ventaSeleccionada);
        return ventaSeleccionada;
      }
    }
    
    return this.selectedVenta;
  }

  navegarNuevaVenta() {
    this.router.navigate(['/nueva-venta']);
  }
}
