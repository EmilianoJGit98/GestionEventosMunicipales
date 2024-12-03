import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { EventosMunicipalesService } from '../../services/eventos-municipales.service';
import { RubroInterface } from '../../Models/rubros.model';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button'; // Importar el módulo de botones de Angular Material
import { MatIconModule } from '@angular/material/icon'; // Importar el módulo de íconos de Angular Material
import { MatPaginator } from '@angular/material/paginator'; // Importar el componente paginator de Angular Material para manejar la paginación
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-asignar-actividades',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, // Importar el módulo de tabla de Angular Material
    MatButtonModule, // Importar el módulo de botones de Angular Material
    MatIconModule, // Importar el módulo de íconos de Angular Material
    MatPaginator, // Importar el módulo paginator de Angular Material para la paginación
    MatInputModule,
    RouterModule,
    RouterLinkActive
  ],
  templateUrl: './asignar-actividades.component.html',
  styleUrl: './asignar-actividades.component.css'
})
export class AsignarActividadesComponent {
  IdEvento: number = 1;
  rubros: RubroInterface[] = [];
  idRubroCheck: number = 0;

  displayedColumns: string[] = ['idrubro', 'Nombre', 'acciones'];
  dataSource: MatTableDataSource<RubroInterface> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Usar ViewChild para obtener una referencia del paginator definido en el HTML
  @ViewChild(MatPaginator) paginatorResponsive!: MatPaginator; // Usar ViewChild para obtener una referencia del paginator definido en el HTML

  constructor(
    private route: ActivatedRoute,
    private servEventos: EventosMunicipalesService,
    private router: Router
  ){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.IdEvento = +params['id'];
    })

    this.cargarRubros()
  }

  cargarRubros(): void {
    this.servEventos.getRubros().subscribe(
      (response: any) => {
        if (Array.isArray(response.rubros)) {
          // Si es un array, asignar directamente
          this.rubros = response.rubros;
          this.dataSource.data = response.rubros;
        } else if (typeof response === 'object') {
          // Si es un objeto, convertirlo a un array
          this.rubros = Object.values(response);
        } else {
          console.error('La respuesta no es un array ni un objeto:', response);
        }
      },
      error => {
        console.error('Error al obtener los rubros', error); // Manejo de errores
      }
    );
  }

  ngAfterViewInit() {
    // Método que se ejecuta después de la inicialización de la vista
    this.dataSource.paginator = this.paginator; // Conectar el paginator a la tabla para manejar la paginación
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Asignar el valor del filtro
  }

  filtroResponsive(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Asignar el valor del filtro
  }

  // cargarRubros(): void {
  //   this.servEventos.getRubros().subscribe(
  //     (data: RubroInterface[]) => {
  //       this.rubros = data;
  //       console.log(this.rubros); // Para verificar que se están recibiendo los eventos
  //     },
  //     (error) => {
  //       console.error('Error al cargar eventos:', error); // Manejo de errores
  //     }
  //   );
  // }

}

