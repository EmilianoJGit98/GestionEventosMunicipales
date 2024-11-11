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
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

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
    FormsModule,
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent {
  formAltaEvento: FormGroup;
  formModiEvento: FormGroup;
  eventoSeleccionado: EventoInterface = <EventoInterface>{};
  evento: any = '';
  // formModiEvento: FormGroup;

  // eventoSeleccionado: EventoInterface;

  eventos: EventoInterface[] = [];
  archivoCargado: boolean = false;
  previsualizacion: string | ArrayBuffer | null = null;

  iconEmpty = '<i class="fas fas fa-cloud-upload-alt fs-alto mt-2"></i>';
  iconNoEmpty = '<i class="fas fas fa-check-circle fs-alto mt-2"></i>';
  mostrarComponente: boolean = true;

  constructor(
    private servEventos: EventosMunicipalesService,
    private BuildForm: FormBuilder, // private addModal: MatDialog, // private getListEventos: EventosDisplayService
    private gestionEventos: EventosDisplayService
  ) {
    this.formAltaEvento = this.BuildForm.group({
      nombre: ['', [Validators.required]],
      fechaDesde: ['', [Validators.required]],
      fechaHasta: ['', [Validators.required]],
      imagen64: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
    });

    this.formModiEvento = this.BuildForm.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      fechaDesde: ['', [Validators.required]],
      fechaHasta: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      // activo: [true]
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
        //console.log(this.eventos); // Para verificar que se están recibiendo los eventos
      },
      (error) => {
        console.error('Error al cargar eventos:', error); // Manejo de errores
      }
    );
  }

  abrirModal(evento: EventoInterface): void {
    this.eventoSeleccionado = { ...evento }; // Clonamos el evento seleccionado

    console.log(this.eventoSeleccionado);

    this.formModiEvento = this.BuildForm.group({
      id: [this.eventoSeleccionado?.id || '', Validators.required],
      nombre: [this.eventoSeleccionado?.nombre || '', Validators.required],
      fechaDesde: [
        this.eventoSeleccionado?.fechaDesde || '',
        Validators.required,
      ],
      fechaHasta: [
        this.eventoSeleccionado?.fechaHasta || '',
        Validators.required,
      ],
      imagen: [this.eventoSeleccionado?.imagen || '', Validators.required],
      // activo: [this.eventoSeleccionado?.activo || true]
    });

    if (this.eventoSeleccionado.imagen) {
      this.previsualizacion = this.eventoSeleccionado.imagen; // Cambia 'image/jpeg' si es necesario
      this.archivoCargado = true; // Indica que la imagen está cargada
    }
  }


  onFileChange(event: any, form: FormGroup) {
    const file = event.target.files[0];
    if (file) {
      this.archivoCargado = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result; // Esto es el base64
        this.previsualizacion = base64String;
        form.get('imagen64')?.setValue(base64String); // Usar el formulario pasado como argumento
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

  borrarImagen(form: FormGroup) {
    form.get('imagen')?.setValue(''); // Limpia el campo del input
    this.archivoCargado = false; // Cambia el estado a falso
    this.previsualizacion = null; // Resetea la vista previa
    const fileInput: any = document.getElementById('file'); // Obtiene el elemento del input
    if (fileInput) {
      fileInput.value = ''; // Limpia el valor del input de archivo
    }
  }

  onSubmit() {
    // console.log(this.formAltaEvento.value)

    if (this.formAltaEvento.valid) {
      if (this.formAltaEvento.valid) {
        const formData = this.formAltaEvento.value;

        this.gestionEventos.altaEvento(this.formAltaEvento.value).subscribe({
          next: (res: any) => {
            // this.participanteId = res.participante;
            // this.createCheckoutButton(res.id);
            console.log(res);
          },
          complete: () => {
            Swal.fire({
              icon: 'success',
              text: 'Evento cargado correctamente',
              confirmButtonText: 'finalizar',
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          },
          error: (error: any) => {
            console.log('error');
          },
        });
      } else {
        console.log('El formulario no es válido');
      }
    }
  }

  onSubmitModificacion() {
    if (this.formModiEvento.valid) {
      if (this.formModiEvento.valid) {
        const formData = this.formModiEvento.value;

        this.gestionEventos
          .modificarEvento(this.formModiEvento.value)
          .subscribe({
            next: (res: any) => {
              // this.participanteId = res.participante;
              // this.createCheckoutButton(res.id);
              console.log(res);
            },
            complete: () => {
              Swal.fire({
                icon: 'success',
                text: 'Evento modificado correctamente',
                confirmButtonText: 'finalizar',
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
                }
              });
            },
            error: (error: any) => {
              console.log('error');
            },
          });
      } else {
        console.log('El formulario no es válido');
      }
    }
  }

  // recargarComponente() {
  //   this.mostrarComponente = false; // Ocultar el componente
  //   setTimeout(() => {
  //     this.mostrarComponente = true; // Mostrar el componente después de un ciclo
  //   }, 0);
  // }
}
