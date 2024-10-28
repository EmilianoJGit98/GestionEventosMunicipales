import { Component, OnInit } from '@angular/core';
import { EventoInterface } from '../Models/eventos.model';
// import { EventosDisplayService } from '../services/gestion-eventos.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Decodebase64Pipe } from '../pipes/decodebase64.pipe';
import { EventosMunicipalesService } from '../services/eventos-municipales.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddEventoComponent } from './add-evento/add-evento.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';




@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    Decodebase64Pipe,
    ReactiveFormsModule
  ],
      templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent {
  formAltaEvento: FormGroup;
  eventos: EventoInterface[] = [];

  constructor(
    private servEventos: EventosMunicipalesService,
    private BuildForm: FormBuilder
    // private addModal: MatDialog,
    // private getListEventos: EventosDisplayService

  ) {

    this.formAltaEvento = this.BuildForm.group({
      nombre: [
        '',
        [
          Validators.required,
        ],
      ],
      fechaDesde: [
        '',
        [
          Validators.required,
        ],
      ],
      fechaHasta: [
        '',
        [
          Validators.required,
        ],
      ],
    });

  }

  ngOnInit() {
    this.cargarEventos();
    // this.eventos = this.getListEventos.ListarEventos();

  }

  cargarEventos(): void {
    this.servEventos.getEventos().subscribe(
      (data: EventoInterface[]) => {
        this.eventos = data;
        console.log(this.eventos); // Para verificar que se están recibiendo los eventos
      },
      (error) => {
        console.error('Error al cargar eventos:', error); // Manejo de errores
      }
    );
  }


  onSubmit() {
    if (this.formAltaEvento.valid) {
      // const formData = this.registroForm.value;
      // this.dataRegistro.updateFormData(formData); //actualizar los datos de la persona en el servicio

      // this.router.navigate(['/actividades'], {
      //   queryParams: { IDevento: this.IDevento },
      // });
    }
  }

}
