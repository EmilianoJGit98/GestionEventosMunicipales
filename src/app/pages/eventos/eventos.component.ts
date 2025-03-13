import { EventoInterface } from './../../Models/eventos.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { EventosDisplayService } from '../services/gestion-eventos.service';
// import { EventosMunicipalesService } from '../../../../../../AngularBackups/checkout-payment/src/app/servicios/eventos-municipales.service';
// import { EventoInterface } from '../../../../../../AngularBackups/checkout-payment/src/app/models/eventos.model';
// import { Decodebase64Pipe } from '../../../../../../AngularBackups/checkout-payment/src/pipes/decodebase64.pipe';
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
import { EventosMunicipalesService } from '../../services/eventos-municipales.service';
import { Decodebase64Pipe } from '../../pipes/decodebase64.pipe';

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
  formBajaEvento: FormGroup;
  eventoSeleccionado: EventoInterface = <EventoInterface>{};
  evento: any = '';
  // formModiEvento: FormGroup;

  // eventoSeleccionado: EventoInterface;

  eventos: EventoInterface[] = [];
  archivoCargadoAlta: boolean = false;
  archivoCargadoModi: boolean = false;
  previsualizacion: string | null = null;
  deshabilitados: number = 1;
  msjVista: string = 'Ver eventos inactivos';

  previsualizacionAlta: string | null = null;
  previsualizacionModi: string | null = null;

  iconEmpty: string = 'visibility';
  mostrarComponente: boolean = true;
  submitOK = false;

  estadoCargaEventos: boolean = false;

  constructor(
    private servEventos: EventosMunicipalesService,
    private BuildForm: FormBuilder, // private addModal: MatDialog, // private getListEventos: EventosDisplayService
    private gestionEventos: EventosDisplayService
  ) {
    this.formAltaEvento = this.BuildForm.group({
      nombre: ['', [Validators.required]],
      fechaDesde: [''],
      fechaHasta: [''],
      imagen64: ['', [Validators.required]],
      // imagen: ['', [Validators.required]],
    });

    this.formModiEvento = this.BuildForm.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      fechaDesde: [''],
      fechaHasta: [''],
      imagen64M: ['', [Validators.required]],
      imagen: [''],
      // activo: [true]
    });

    this.formBajaEvento = this.BuildForm.group({
      idEvento: ['', [Validators.required]],
      activo: ['', [Validators.required]],
      // Nombre: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // Recuperar el estado guardado desde localStorage al iniciar la aplicación
    const estadoGuardado = localStorage.getItem('deshabilitados');
    this.deshabilitados = estadoGuardado !== null ? Number(estadoGuardado) : 0;

    this.msjVista =
      this.deshabilitados === 1
        ? 'Ver eventos inactivos'
        : 'Ver eventos activos';
    this.iconEmpty =
      this.deshabilitados === 1 ? 'visibility' : 'visibility_off';

    // this.mostrarInactivos();

    this.cargarEventos(this.deshabilitados); // Carga inicialmente los eventos
  }

  mostrarInactivos(): void {
    // Cambia el estado de deshabilitados
    this.deshabilitados = this.deshabilitados === 1 ? 0 : 1;

    // Actualiza el mensaje de vista
    this.msjVista =
      this.deshabilitados === 1
        ? 'Mostrar eventos inactivos'
        : 'Mostrar eventos activos';
    this.iconEmpty =
      this.deshabilitados === 1 ? 'visibility' : 'visibility_off';

    // Guardar el estado en localStorage
    localStorage.setItem('deshabilitados', String(this.deshabilitados));

    // Cargar los eventos según el nuevo estado
    this.cargarEventos(this.deshabilitados);
  }

  cargarEventos(deshabiliados: number): void {
    let estadoVista = deshabiliados;
    this.estadoCargaEventos = true;

    this.servEventos.getEventos(estadoVista).subscribe(
      (data: EventoInterface[]) => {
        this.eventos = data;
        this.estadoCargaEventos = false;
        // console.log(this.eventos); // Para verificar que se están recibiendo los eventos
      },
      (error) => {
        console.error('Error al cargar eventos:', error); // Manejo de errores
      }
    );
  }

  abrirModal(evento: EventoInterface): void {
    this.eventoSeleccionado = { ...evento }; // Clonamos el evento seleccionado

    this.formModiEvento = this.BuildForm.group({
      id: [this.eventoSeleccionado?.id || '', Validators.required],
      nombre: [this.eventoSeleccionado?.nombre || '', Validators.required],
      fechaDesde: [this.eventoSeleccionado?.fechaDesde || ''],
      fechaHasta: [this.eventoSeleccionado?.fechaHasta || ''],
      imagen64M: [this.eventoSeleccionado?.imagen || '', Validators.required],
      imagen: [''],
    });

    if (this.eventoSeleccionado.imagen) {
      this.previsualizacionModi = this.eventoSeleccionado.imagen; // Cambia 'image/jpeg' si es necesario
      this.archivoCargadoModi = true; // Indica que la imagen está cargada
    }
  }

  bajaEventoModal(evento: EventoInterface): void {
    this.eventoSeleccionado = { ...evento };

    const varActivo = this.eventoSeleccionado.activo ? 1 : '0';

    // console.log(varActivo)

    this.formBajaEvento = this.BuildForm.group({
      idEvento: [this.eventoSeleccionado?.id || '', Validators.required],
      activo: [varActivo || '', Validators.required],
      // Nombre: [this.eventoSeleccionado?.nombre || '', Validators.required],
    });
  }

  onFileChangeAlta(event: any, form: FormGroup) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result; // Esto es el base64
        this.previsualizacionAlta = base64String;
        this.archivoCargadoAlta = true;
        form.get('imagen64')?.setValue(base64String);
      };
      reader.readAsDataURL(file); // Leer el archivo y convertirlo a Base64
    }
  }

  borrarImagenAlta(form: FormGroup) {
    form.get('imagen64')?.setValue(''); // Limpia el campo del input
    // Cambia el estado a falso

    this.archivoCargadoAlta = false;
    this.previsualizacionAlta = null; // Resetea la vista previa del formulario de alta

    const fileInput: any = document.getElementById('file'); // Obtiene el elemento del input
    if (fileInput) {
      fileInput.value = ''; // Limpia el valor del input de archivo
    }
  }

  onFileChange(event: any, form: FormGroup) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result; // Esto es el base64
        this.archivoCargadoModi = true;
        this.previsualizacionModi = base64String;
        form.get('imagen64M')?.setValue(base64String); // Usar el formulario pasado como argumento
      };
      reader.readAsDataURL(file); // Leer el archivo y convertirlo a Base64
    }
  }

  borrarImagen(form: FormGroup) {
    form.get('imagen64')?.setValue(''); // Limpia el campo del input
    // Cambia el estado a falso
    this.archivoCargadoModi = false;
    this.previsualizacionModi = null; // Resetea la vista previa del formulario de modificación

    const fileInput: any = document.getElementById('fileModi'); // Obtiene el elemento del input
    if (fileInput) {
      fileInput.value = ''; // Limpia el valor del input de archivo
    }
  }

  onSubmit() {
    // console.log(this.formAltaEvento.value)

    if (this.formAltaEvento.valid) {
      if (this.formAltaEvento.valid) {
        let timerInterval;
        Swal.fire({
          // title: 'Creando evento!',
          html: 'Creando evento, por favor espere un momento',
          timer: 2000,
          timerProgressBar: true,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {},
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer');
          }
        });

        this.submitOK = true;
        // const formData = this.formAltaEvento.value;
        const formData = new FormData();

        formData.append(
          'nombre',
          this.formAltaEvento.get('nombre')?.value || ''
        );
        formData.append(
          'fechaDesde',
          this.formAltaEvento.get('fechaDesde')?.value || ''
        );
        formData.append(
          'fechaHasta',
          this.formAltaEvento.get('fechaHasta')?.value || ''
        );
        // Agregar la imagen
        const fileInput: HTMLInputElement = document.getElementById(
          'file'
        ) as HTMLInputElement; // Asegúrate de que el ID coincida
        if (fileInput.files && fileInput.files.length > 0) {
          formData.append('imagen', fileInput.files[0]); // Agregar el archivo de imagen
        } else {
          // console.log('No se ha seleccionado ninguna imagen');
          // this.formAltaEvento.invalid;
          this.submitOK = false;
          return;
        }

        this.gestionEventos.altaEvento(formData).subscribe({
          next: (res: any) => {
            // console.log(res);
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
            // console.log('error');
            this.submitOK = false;
          },
        });
      } else {
        // console.log('El formulario no es válido');
      }
    }
  }

  onSubmitModificacion() {
    if (this.formModiEvento.valid) {
      if (this.formModiEvento.valid) {
        // Crear FormData
        const formData = new FormData();

        // Añadir todos los campos del formulario
        formData.append('id', this.formModiEvento.get('id')?.value || '');
        formData.append(
          'nombre',
          this.formModiEvento.get('nombre')?.value || ''
        );
        formData.append(
          'fechaDesde',
          this.formModiEvento.get('fechaDesde')?.value || ''
        );
        formData.append(
          'fechaHasta',
          this.formModiEvento.get('fechaHasta')?.value || ''
        );

        // Agregar la imagen
        const fileInput: HTMLInputElement = document.getElementById(
          'fileInputId'
        ) as HTMLInputElement; // Asegúrate de que el ID coincida
        if (fileInput.files && fileInput.files.length > 0) {
          formData.append('imagen', fileInput.files[0]); // Agregar el archivo de imagen
        } else {
          formData.append('imagen', '');
        }

        formData.forEach((value, key) => {
          // console.log(`${key}:`, value);
        });

        this.gestionEventos.modificarEvento(formData).subscribe({
          next: (res: any) => {
            //console.log(res.message)

            if (
              res.message ===
              'No se puede modificar el evento porque ha comenzado, está en curso o ha finalizado.'
            ) {
              Swal.fire({
                icon: 'warning',
                text: res.message,
                confirmButtonText: 'finalizar',
              }).then((result) => {});
            } else {
              Swal.fire({
                icon: 'success',
                text: 'Evento modificado correctamente',
                confirmButtonText: 'confirmar',
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
                }
              });
            }
          },
          complete: () => {},
          error: (error: any) => {
            // console.log('error', error);
          },
        });
      } else {
        // console.log('El formulario no es válido');
      }
    }
  }

  onSubmitBajaEvento() {
    if (this.formBajaEvento.valid) {
      const formData = this.formBajaEvento.value;

      // console.log(formData)

      this.gestionEventos.cambioEstadoEvento(formData).subscribe({
        next: (res: any) => {
          // console.log(res);
        },
        complete: () => {
          Swal.fire({
            icon: 'success',
            text: 'Evento actualizado correctamente',
            confirmButtonText: 'finalizar',
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        },
        error: (error: any) => {
          // console.log('error');
        },
      });
    } else {
      // console.log('El formulario no es válido');
    }
  }
}
