import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  pageTitle: string = 'Nombre Local Actual';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.pageTitle = this.getPageTitle(this.router.url);
    });
    this.pageTitle = this.getPageTitle(this.router.url);
  }

  getPageTitle(url: string): string {
    if (url.includes('/registrar-producto')) return 'Registrar Producto';
    if (url.includes('/buscar-producto')) return 'Buscar Producto';
    if (url.includes('/editar-producto')) return 'Editar Producto';
    if (url.includes('/productos')) return 'Productos';
    if (url.includes('/ventas')) return 'Ventas';
    if (url.includes('/compras')) return 'Compras';
    if (url.includes('/proveedores')) return 'Proveedores';
    if (url.includes('/home')) return 'Nombre Local Actual';
    return 'Nombre Local Actual';
  }
}
