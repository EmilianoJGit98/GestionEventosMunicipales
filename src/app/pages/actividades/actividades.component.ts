import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ActividadesServ } from '../../services/actividades-municipales.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
// import { MatIconModule } from '@angular/material/icon';
import { EventosMunicipalesService } from '../../services/eventos-municipales.service';

import { MatButtonModule } from '@angular/material/button'; // Importar el módulo de botones de Angular Material
import { MatIconModule } from '@angular/material/icon'; // Importar el módulo de íconos de Angular Material
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importar el componente paginator de Angular Material para manejar la paginación
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SubRubroInterface } from '../../Models/subrurbros.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormsModule } from '@angular/forms';
import { EventosDisplayService } from '../../services/gestion-eventos.service';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule, // Agregar HttpClientModule aquí
    MatPaginatorModule,
    MatPaginator,
    MatInputModule,
    MatTableModule,
    FormsModule,
  ],
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'], // Asegúrate de que sea styleUrls aquí
})
export class ActividadesComponent implements OnInit {
  IdEvento: number = 0;
  IdRubro: number = 0;
  arrayActividadesAsig: any[] = [];
  arrayActividadesAsignadas: any[] = [];
  selectedIds: Set<number> = new Set();
  selectedSubRubros: { idSubRubro: number }[] = [];
  subrubrosFiltrados: any[] = []; // Nuevo arreglo para subrubros filtrados
  showMessage: boolean = false;
  messageText: string = '';

  dataObject: any;
  arraySubrubros: SubRubroInterface[] = [];

  displayedColumnsAsig: string[] = [
    'idSubRubro',
    'Descripcion',
    'Importe',
    'Seleccionar',
  ];
  dataSourceAsig: MatTableDataSource<SubRubroInterface> =
    new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Usar ViewChild para obtener una referencia del paginator definido en el HTML
  @ViewChild(MatPaginator) paginatorResponsive!: MatPaginator; // Usar ViewChild para obtener una referencia del paginator definido en el HTML

  constructor(
    private route: ActivatedRoute,
    private getActividades: ActividadesServ,
    private EventosMunicipalesService: EventosMunicipalesService,
    private formBuilder: FormBuilder,
    private gestionEventosService: EventosDisplayService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.IdEvento = +params['idEvento'];
      this.IdRubro = +params['idRubro'];
    });

    this.getSubRubros(this.IdRubro);
    this.getActividadesxEvento(this.IdEvento);
  }

  ngAfterViewInit() {
    this.dataSourceAsig.paginator = this.paginator; // Conectar el paginator a la tabla para manejar la paginación
  }

  getActividadesxEvento(IdEvento: number): void {
    if (!IdEvento || IdEvento <= 0) {
      console.error('ID de rubro inválido');
      this.arrayActividadesAsignadas = []; // Resetea la variable si el ID es inválido
      return;
    }

    this.EventosMunicipalesService.getActividadesAsignadas(
      this.IdEvento
    ).subscribe(
      (data: any) => {
        if (data) {
          this.arrayActividadesAsignadas = data; // Asigna los datos recibidos a la variable
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

  getSubRubros(idRubro: number): void {
    if (!idRubro || idRubro <= 0) {
      console.error('ID de rubro inválido');
      this.arrayActividadesAsig = [];
      return;
    }
    this.EventosMunicipalesService.getSubRubros(idRubro).subscribe(
      (data: any) => {
        // Verifica si hay datos antes de asignar
        if (data && data.subrubros) {
          this.arrayActividadesAsig = data.subrubros;
          this.dataSourceAsig.data = data.subrubros;
          this.dataSourceAsig.paginator = this.paginator;
        } else {
          console.warn(
            'No se encontraron subrubros para el rubro especificado'
          );
          this.arrayActividadesAsig = []; // Resetea en caso de que no haya subrubros
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

  acumulador(idSubRubro: number): boolean {
    return this.selectedIds.has(idSubRubro);
  }

  submitForm() {
    this.dataObject = {
      subrubros: this.selectedSubRubros,
      idEvento: this.IdEvento,
    };

    if (this.arrayActividadesAsig.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debes seleccionar al menos una actividad para continuar.',
        confirmButtonText: 'Aceptar',
      });
      return; // Salir de la función si no hay actividades seleccionadas
    } else {
      this.gestionEventosService.asignarActividades(this.dataObject).subscribe({
        next: (res: any) => {
          // console.log(res);
        },
        complete: () => {
          Swal.fire({
            icon: 'success',
            text: 'actividades asignadas correctamente',
            confirmButtonText: 'finalizar',
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        },
        error: (error: any) => {
          if (error) {
            const excepcionLogin: any = {
              'Token expirado.':
                'El tiempo de inactividad caducó, por favor inicie sesion nuevamente.',
            };
            Swal.fire({
              icon: 'error',
              title: '',
              text: excepcionLogin[error.error.detail] ?? 'ocurrio algo',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timerProgressBar: true,
              showCloseButton: true,
            });

            this.router.navigateByUrl('login');
          }
        },
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAsig.filter = filterValue.trim().toLowerCase(); // Asignar el valor del filtro
  }

  filtroResponsive(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAsig.filter = filterValue.trim().toLowerCase(); // Asignar el valor del filtro
  }

  seleccionActividades(event: Event, idSubRubro: number) {
    const target = event.target as HTMLInputElement;

    const alreadyAssigned = this.arrayActividadesAsignadas.some(
      (asignado) => asignado.idSubRubro === idSubRubro
    );

    if (target.checked) {
      // Verifica si la actividad ya está asignada
      if (alreadyAssigned) {
        // Mostrar mensaje de advertencia
        // alert(`La actividad con idSubRubro: ${idSubRubro} ya está asignada.`);
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Esta actividad ya está asignada al evento',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          showCloseButton: true,
          timer: 1500,
        });

        // Desmarcar el checkbox
        target.checked = false;

        // No agregar a selectedSubRubros porque no se puede seleccionar
        return; // Sale de la función
      }

      // Si no está asignada, se agrega a la selección
      this.selectedSubRubros.push({
        idSubRubro: idSubRubro,
      });
    } else {
      // Si el checkbox es desmarcado, remover de la lista de seleccionados
      this.selectedSubRubros = this.selectedSubRubros.filter(
        (item) => item.idSubRubro !== idSubRubro
      );
    }
  }
}
