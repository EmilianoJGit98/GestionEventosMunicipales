import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ActividadesServ } from '../../services/actividades-municipales.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
// import { MatIconModule } from '@angular/material/icon';
import { EventosMunicipalesService } from '../../services/eventos-municipales.service';

import { MatButtonModule } from '@angular/material/button'; // Importar el módulo de botones de Angular Material
import { MatIconModule } from '@angular/material/icon'; // Importar el módulo de íconos de Angular Material
import { MatPaginator } from '@angular/material/paginator'; // Importar el componente paginator de Angular Material para manejar la paginación
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SubRubroInterface } from '../../Models/subrurbros.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormsModule } from '@angular/forms';


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
    MatPaginator,
    MatInputModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'] // Asegúrate de que sea styleUrls aquí
})
export class ActividadesComponent implements OnInit {
  IdEvento: number = 0;
  IdRubro: number = 0;
  arrayActividades: any[] = [];
  selectedIds: Set<number> = new Set();
  selectedSubRubros: { idSubRubro: number }[] = [];

  dataObject: any;
  arraySubrubros: SubRubroInterface[] = [];


  displayedColumns: string[] = ['idSubRubro', 'Descripcion', 'Importe', 'Seleccionar'];
  dataSource: MatTableDataSource<SubRubroInterface[]> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Usar ViewChild para obtener una referencia del paginator definido en el HTML
  @ViewChild(MatPaginator) paginatorResponsive!: MatPaginator; // Usar ViewChild para obtener una referencia del paginator definido en el HTML

  constructor(
    private route: ActivatedRoute,
    private getActividades: ActividadesServ,
    private EventosMunicipalesService: EventosMunicipalesService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    // this.IdEvento = +this.route.snapshot.paramMap.get('idEvento')!; // Convierte a número
    // console.log(this.IdEvento);
    // this.getActividadesxEvento(this.IdEvento);

    this.route.params.subscribe(params => {
      this.IdEvento = +params['idEvento'];
      this.IdRubro = +params['idRubro'];
      // console.log(this.IdEvento)
      // console.log(this.IdRubro)
      // this.getActividadesxEvento(this.IdEvento)
    })

    this.getActividadesxEvento(this.IdRubro)
  }


  getActividadesxEvento(idRubro: number): void {
    this.EventosMunicipalesService.getSubRubros(idRubro).subscribe(
      (data: any) => {
        this.arrayActividades = data.subrubros; // Asigna los datos recibidos a la variable
        this.dataSource.data = data.subrubros;
        // console.log(this.arrayActividades);
      },
      (error: string) => {
        console.error('Error al obtener actividades:', error);
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

  seleccionActividades(event: Event,
     idSubRubro: number
  ) {
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

    console.log(this.selectedSubRubros);
  }

  acumulador(idSubRubro: number): boolean {
    return this.selectedIds.has(idSubRubro);
  }

  submitForm(){
    this.dataObject = {
      subrubros: this.selectedSubRubros,
      idEvento: this.IdEvento,
      idRubro: this.IdRubro
    }

    if (this.arrayActividades.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debes seleccionar al menos una actividad para continuar.',
        confirmButtonText: 'Aceptar',
      });
      return; // Salir de la función si no hay actividades seleccionadas
    }

    console.log(this.dataObject)

  }
}
