import { Component } from '@angular/core';
import { Navbar } from '../../../funcionalidades/navbar/navbar';
import { CompraService } from '../../../services/compra.service';
import { Compra } from '../../../models/compra';
import { CommonModule, DatePipe } from '@angular/common';
import { UsuarioData } from '../../usuario-data/usuario-data';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [Navbar, CommonModule, UsuarioData],
  providers: [DatePipe],
  templateUrl: './compras.html',
  styleUrl: './compras.css'
})
export class Compras {
  compras: Compra[] = [];
  selectedCompra: Compra | null = null;

  comprasAdaptadas: any[] = [];

  constructor(private compraService: CompraService) {
    // Obtener las compras del servicio
    this.compras = this.compraService.getCompras();
    
    // Adaptar la estructura de las compras para que sea compatible con el navbar
    this.comprasAdaptadas = this.compras.map(compra => ({
      id: compra.idCompra,
      username: `Compra #${compra.idCompra} - ${compra.nombreProveedor}`,
      // Mantenemos una referencia a la compra original
      original: compra
    }));
  }

  onUserSelected(objetoSeleccionado: any) {
    if (!objetoSeleccionado) {
      return null;
    }
    
    console.log('Objeto seleccionado:', objetoSeleccionado);
    
    // Si el objeto tiene la propiedad 'original', es el objeto adaptado del navbar
    if (objetoSeleccionado.original) {
      this.selectedCompra = objetoSeleccionado.original;
      console.log('Compra seleccionada:', this.selectedCompra);
      return this.selectedCompra;
    } 
    // Si no tiene 'original', puede ser el objeto en sí
    else {
      const compraSeleccionada = this.compras.find(c => c.idCompra === objetoSeleccionado.id);
      if (compraSeleccionada) {
        this.selectedCompra = compraSeleccionada;
        console.log('Compra encontrada por ID:', compraSeleccionada);
        return compraSeleccionada;
      }
    }
    
    return this.selectedCompra;
  }
}
