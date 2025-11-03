import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VentaService } from '../../../services/venta.service';
import { ProductoService } from '../../../services/producto.service';
import { EstudianteService } from '../../../services/estudiante.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.html',
  styleUrls: ['./reportes.css']
})
export class Reportes implements OnInit {
  // Datos de ganancias
  gananciasHoy: number = 0;
  gananciasSemana: number = 0;
  gananciasMes: number = 0;
  
  // Datos para gráficas
  ventasPorDia: { dia: string; monto: number }[] = [];
  productosMasVendidos: { nombre: string; cantidad: number; porcentaje: number }[] = [];
  
  // Top estudiantes y productos
  topEstudiantes: { nombre: string; compras: number; total: number }[] = [];
  topProductos: { nombre: string; vendidos: number; ganancia: number }[] = [];
  
  constructor(
    private ventaService: VentaService,
    private productoService: ProductoService,
    private estudianteService: EstudianteService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.calcularGanancias();
    this.calcularVentasPorDia();
    this.calcularProductosMasVendidos();
    this.calcularTopEstudiantes();
    this.calcularTopProductos();
  }
  
  calcularGanancias() {
    const ventas = this.ventaService.getVentas();
    const hoy = new Date();
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - 7);
    const inicioMes = new Date(hoy);
    inicioMes.setDate(hoy.getDate() - 30);
    
    this.gananciasHoy = ventas
      .filter(v => {
        const fechaVenta = new Date(v.fecha || '');
        return fechaVenta.toDateString() === hoy.toDateString();
      })
      .reduce((sum, v) => sum + (v.total || 0), 0);
    
    this.gananciasSemana = ventas
      .filter(v => {
        const fechaVenta = new Date(v.fecha || '');
        return fechaVenta >= inicioSemana;
      })
      .reduce((sum, v) => sum + (v.total || 0), 0);
    
    this.gananciasMes = ventas
      .filter(v => {
        const fechaVenta = new Date(v.fecha || '');
        return fechaVenta >= inicioMes;
      })
      .reduce((sum, v) => sum + (v.total || 0), 0);
  }
  
  calcularVentasPorDia() {
    const ventas = this.ventaService.getVentas();
    const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const ventasPorDiaMap = new Map<string, number>();
    
    // Inicializar todos los días en 0
    dias.forEach(dia => ventasPorDiaMap.set(dia, 0));
    
    // Calcular ventas por día
    ventas.forEach(venta => {
      const fecha = new Date(venta.fecha || '');
      const diaSemana = dias[fecha.getDay() === 0 ? 6 : fecha.getDay() - 1];
      ventasPorDiaMap.set(diaSemana, (ventasPorDiaMap.get(diaSemana) || 0) + (venta.total || 0));
    });
    
    this.ventasPorDia = Array.from(ventasPorDiaMap.entries()).map(([dia, monto]) => ({
      dia,
      monto: Math.round(monto)
    }));
  }
  
  calcularProductosMasVendidos() {
    const ventas = this.ventaService.getVentas();
    const productosMap = new Map<number, number>();
    
    // Contar cantidad vendida por producto
    ventas.forEach(venta => {
      if (venta.productosVendidos) {
        Object.entries(venta.productosVendidos).forEach(([idStr, cantidad]) => {
          const id = parseInt(idStr);
          const actual = productosMap.get(id) || 0;
          productosMap.set(id, actual + cantidad);
        });
      }
    });
    
    // Obtener top 5 productos
    const productosArray = Array.from(productosMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    const totalVendido = productosArray.reduce((sum, [_, cant]) => sum + cant, 0);
    
    this.productosMasVendidos = productosArray.map(([id, cantidad]) => {
      const producto = this.productoService.getProductoById(id);
      return {
        nombre: producto?.nombre || 'Producto Desconocido',
        cantidad,
        porcentaje: Math.round((cantidad / totalVendido) * 100)
      };
    });
  }
  
  calcularTopEstudiantes() {
    const ventas = this.ventaService.getVentas();
    const estudiantesMap = new Map<number, { compras: number; total: number }>();
    
    ventas.forEach(venta => {
      if (venta.idEstudiante) {
        const actual = estudiantesMap.get(venta.idEstudiante) || { compras: 0, total: 0 };
        estudiantesMap.set(venta.idEstudiante, {
          compras: actual.compras + 1,
          total: actual.total + (venta.total || 0)
        });
      }
    });
    
    const estudiantesArray = Array.from(estudiantesMap.entries())
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5);
    
    this.topEstudiantes = estudiantesArray.map(([id, datos]) => {
      const estudiante = this.estudianteService.getEstudianteById(id);
      return {
        nombre: estudiante?.nombreCompleto || 'Estudiante Desconocido',
        compras: datos.compras,
        total: datos.total
      };
    });
  }
  
  calcularTopProductos() {
    const ventas = this.ventaService.getVentas();
    const productosMap = new Map<number, { vendidos: number; ganancia: number }>();
    
    ventas.forEach(venta => {
      if (venta.productosVendidos) {
        Object.entries(venta.productosVendidos).forEach(([idStr, cantidad]) => {
          const id = parseInt(idStr);
          const actual = productosMap.get(id) || { vendidos: 0, ganancia: 0 };
          const producto = this.productoService.getProductoById(id);
          const ganancia = (producto?.precio || 0) * cantidad;
          
          productosMap.set(id, {
            vendidos: actual.vendidos + cantidad,
            ganancia: actual.ganancia + ganancia
          });
        });
      }
    });
    
    const productosArray = Array.from(productosMap.entries())
      .sort((a, b) => b[1].ganancia - a[1].ganancia)
      .slice(0, 5);
    
    this.topProductos = productosArray.map(([id, datos]) => {
      const producto = this.productoService.getProductoById(id);
      return {
        nombre: producto?.nombre || 'Producto Desconocido',
        vendidos: datos.vendidos,
        ganancia: datos.ganancia
      };
    });
  }
  
  getMaxVentaDia(): number {
    if (this.ventasPorDia.length === 0) return 100;
    return Math.max(...this.ventasPorDia.map(v => v.monto));
  }
  
  getAlturaBarraDia(monto: number): number {
    const max = this.getMaxVentaDia();
    return (monto / max) * 100;
  }
  
  getColorDonut(index: number): string {
    const colores = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    return colores[index % colores.length];
  }
  
  getStrokeDashoffset(index: number): number {
    const acumulado = this.productosMasVendidos
      .slice(0, index)
      .reduce((sum, p) => sum + p.porcentaje, 0);
    return 502.4 - (acumulado * 502.4 / 100);
  }
  
  irAHistorialVentas() {
    this.router.navigate(['/ventas']);
  }
  
  imprimirReporte() {
    window.print();
  }
}
