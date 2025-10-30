import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from '../../../services/venta.service';
import { Venta } from '../../../models/venta';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css'
})
export class Ventas {
  ventas: Venta[] = [];
  ventasFiltradas: Venta[] = [];
  terminoBusqueda: string = '';

  constructor(
    private ventaService: VentaService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.ventas = this.ventaService.getVentas();
    this.ventasFiltradas = [...this.ventas];
  }

  buscarVenta() {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    
    if (termino === '') {
      this.ventasFiltradas = [...this.ventas];
    } else {
      this.ventasFiltradas = this.ventas.filter(venta => 
        venta.nombreEstudiante?.toLowerCase().includes(termino) ||
        venta.idVenta?.toString().includes(termino) ||
        this.formatearFecha(venta.fecha).toLowerCase().includes(termino)
      );
    }
  }

  formatearFecha(fecha: Date | undefined): string {
    if (!fecha) return 'Fecha no disponible';
    return this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm') || 'Fecha no disponible';
  }

  verDetalleVenta(venta: Venta) {
    // Aquí puedes implementar la navegación a una página de detalle
    console.log('Ver detalle de venta:', venta);
    // Por ejemplo: this.router.navigate(['/ventas/detalle', venta.idVenta]);
  }

  navegarNuevaVenta() {
    this.router.navigate(['/nueva-venta']);
  }
}

