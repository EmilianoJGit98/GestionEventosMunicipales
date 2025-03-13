import { Component, ViewChild } from '@angular/core';
import { EventosMunicipalesService } from '../../services/eventos-municipales.service';
import { ActividadAsignadaInterface } from '../../Models/actividad-asignada.model';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EventosDisplayService } from '../../services/gestion-eventos.service';

@Component({
  selector: 'app-actividades-asignadas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule, // Agregar HttpClientModule aquí
    MatPaginator,
    MatInputModule,
    MatTableModule,
    FormsModule,
  ],
  templateUrl: './actividades-asignadas.component.html',
  styleUrl: './actividades-asignadas.component.css',
})
export class ActividadesAsignadasComponent {
  idEvento: number = 0;
  actividades: ActividadAsignadaInterface[] = [];
  arrayActividadesAsignadas: any[] = [];
  selectedIds: Set<number> = new Set();
  selectedSubRubros: { idSubRubro: number }[] = [];
  dataObject: any;
  icon: any;

  //tabla material
  displayedColumnsActs: string[] = [
    'idSubRubro',
    'Descripcion',
    'Importe',
    'Seleccionar',
  ];
  dataSourceActs: MatTableDataSource<ActividadAsignadaInterface[]> =
    new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Usar ViewChild para obtener una referencia del paginator definido en el HTML
  @ViewChild(MatPaginator) paginatorResponsive!: MatPaginator; // Usar ViewChild para obtener una referencia del paginator definido en el HTML

  constructor(
    private EventosMunicipalesService: EventosMunicipalesService,
    private gestionEventosService: EventosDisplayService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idEvento = +params['idEvento'];
    });
    this.getActividadesxEvento(this.idEvento);
  }

  getActividadesxEvento(idEvento: number): void {
    if (!idEvento || idEvento <= 0) {
      console.error('ID de rubro inválido');
      this.arrayActividadesAsignadas = []; // Resetea la variable si el ID es inválido
      return;
    }

    // console.log(idEvento);

    this.EventosMunicipalesService.getActividadesAsignadas(
      this.idEvento
    ).subscribe(
      (data: any) => {
        // Verifica si hay datos antes de asignar
        if (data) {
          this.arrayActividadesAsignadas = data; // Asigna los datos recibidos a la variable
          this.dataSourceActs.data = data; // Asignas los datos al dataSource
          this.dataSourceActs.paginator = this.paginator; // Asigna el paginador después de establecer el dataSource
          // console.log(this.arrayActividadesAsignadas)
        } else {
          console.warn(
            'No se encontraron subrubros para el rubro especificado'
          );
          this.arrayActividadesAsignadas = []; // Resetea en caso de que no haya subrubros
        }
      },
      (error: any) => {
        console.error('Error al obtener actividades:', error);
        if (error.status === 404) {
          console.warn(
            'No se encontraron subrubros para el ID de rubro proporcionado.'
          );
        } else {
          console.error('Error inesperado:', error);
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActs.filter = filterValue.trim().toLowerCase(); // Asignar el valor del filtro
  }

  submitForm() {
    this.dataObject = {
      subrubros: this.selectedSubRubros,
      idEvento: this.idEvento,
    };

    if (this.arrayActividadesAsignadas.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debes seleccionar al menos una actividad para continuar.',
        confirmButtonText: 'Aceptar',
      });
      return; // Salir de la función si no hay actividades seleccionadas
    } else {
      this.gestionEventosService.eliminarAsignacion(this.dataObject).subscribe({
        next: (res: any) => {
          this.icon = res.success == true ? 'success' : 'error';

          Swal.fire({
            icon: this.icon,
            text: res.message,
            confirmButtonText: 'finalizar',
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        },
        complete: () => {},
        error: (error: any) => {},
      });
    }
  }

  acumulador(idSubRubro: number): boolean {
    return this.selectedIds.has(idSubRubro);
  }

  seleccionActividades(event: Event, idSubRubro: number) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.selectedSubRubros.push({
        idSubRubro: idSubRubro,
      });
    } else {
      this.selectedSubRubros = this.selectedSubRubros.filter(
        (item) => item.idSubRubro !== idSubRubro
      );
    }
  }
}
