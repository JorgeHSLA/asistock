import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proveedor } from '../../../models/proveedor';
import { ProveedorService } from '../../../services/proveedor.service';
import { Navbar } from '../../navbar/navbar';
import { UsuarioData } from '../../usuario-data/usuario-data';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, Navbar, UsuarioData],
  templateUrl: './proveedores.html',
  styleUrls: [`./proveedores.css`]
})
export class Proveedores {
  proveedores: Proveedor[] = [];
  selectedProveedor: Proveedor | null = null;
  
  proveedoresAdaptados: any[] = [];
  
  constructor(
    private proveedorService: ProveedorService,
    private productoService: ProductoService
  ) {
    // Obtener los proveedores del servicio
    this.proveedores = this.proveedorService.getProveedores();
    
    // Adaptar la estructura de los proveedores para que sea compatible con el navbar
    this.proveedoresAdaptados = this.proveedores.map(proveedor => ({
      id: proveedor.idProvedor,
      username: proveedor.nombre || `Proveedor #${proveedor.idProvedor}`,
      // Mantenemos una referencia al proveedor original
      original: proveedor
    }));
  }
  
  onUserSelected(objetoSeleccionado: any) {
    if (!objetoSeleccionado) {
      return null;
    }
    
    console.log('Objeto seleccionado:', objetoSeleccionado);
    
    // Si el objeto tiene la propiedad 'original', es el objeto adaptado del navbar
    if (objetoSeleccionado.original) {
      this.selectedProveedor = objetoSeleccionado.original;
      console.log('Proveedor seleccionado:', this.selectedProveedor);
      return this.selectedProveedor;
    } 
    // Si no tiene 'original', puede ser el objeto en sí
    else {
      const proveedorSeleccionado = this.proveedores.find(p => p.idProvedor === objetoSeleccionado.id);
      if (proveedorSeleccionado) {
        this.selectedProveedor = proveedorSeleccionado;
        console.log('Proveedor encontrado por ID:', proveedorSeleccionado);
        return proveedorSeleccionado;
      }
    }
    
    return this.selectedProveedor;
  }
}