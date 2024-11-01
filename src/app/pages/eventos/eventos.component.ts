import { Component, OnInit } from '@angular/core';
// import { EventosDisplayService } from '../services/gestion-eventos.service';
import { EventosMunicipalesService } from '../../../../../../AngularBackups/checkout-payment/src/app/servicios/eventos-municipales.service';
import { EventoInterface } from '../../../../../../AngularBackups/checkout-payment/src/app/models/eventos.model';
import { Decodebase64Pipe } from '../../../../../../AngularBackups/checkout-payment/src/pipes/decodebase64.pipe';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EventosDisplayService } from '../../services/gestion-eventos.service';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


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
    ReactiveFormsModule,
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent {
  formAltaEvento: FormGroup;
  eventos: EventoInterface[] = [];
  archivoCargado: boolean = false;
  previsualizacion: string | ArrayBuffer | null = null;

  iconEmpty = '<i class="fas fas fa-cloud-upload-alt fs-alto mt-2"></i>';
  iconNoEmpty = '<i class="fas fas fa-check-circle fs-alto mt-2"></i>';

  constructor(
    private servEventos: EventosMunicipalesService,
    private BuildForm: FormBuilder, // private addModal: MatDialog, // private getListEventos: EventosDisplayService
    private gestionEventos: EventosDisplayService
  ) {
    this.formAltaEvento = this.BuildForm.group({
      nombre: ['', [Validators.required]],
      fechaDesde: ['', [Validators.required]],
      fechaHasta: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      activo: ['true']
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoCargado = true;
      const fileName = file.name;
      const filePath = file.webkitRelativePath || file.name; // Para obtener la ruta (nombre del archivo), ya que el navegador no te da el path
      //console.log('Nombre del archivo:', fileName);
      //console.log('Ruta del archivo:', filePath);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result; // Esto es el base64
        this.previsualizacion = e.target.result;
        this.formAltaEvento.get('imagen')?.setValue(base64String);
        //console.log('Base64:', base64String);
      };
      reader.readAsDataURL(file); // Leer el archivo y convertirlo a Base64
    }
  }

  resetFile() {
    this.formAltaEvento.get('imagen')?.setValue(''); // Limpia el campo del input
    this.archivoCargado = false; // Cambia el estado a falso
    this.previsualizacion = null; // Resetea la vista previa
    const fileInput: any = document.getElementById('file'); // Obtiene el elemento del input
    if (fileInput) {
      fileInput.value = ''; // Limpia el valor del input de archivo
    }
  }

  onSubmit() {
    if (this.formAltaEvento.valid) {
      if (this.formAltaEvento.valid) {
        const formData = this.formAltaEvento.value;

        this.gestionEventos.altaEvento(this.formAltaEvento.value).subscribe({
          next: (res: any) => {
            // this.participanteId = res.participante;
            // this.createCheckoutButton(res.id);
            console.log("next")
          },
          complete: () => {
            console.log("complete")
            // this.cargando = false;
          },
          error: (error: any) => {
            // this.router.navigate(['/pago-rechazado/' + this.IDevento]);
            // this.router.navigate(['/rechazado']);
            console.log("error")
            // this.cargando = false;
          },
        });
        } else {
        console.log('El formulario no es válido');
        }
    }
  }
}
