import { Component, Inject } from '@angular/core'; // Decorador para definir componentes y para inyección de dependencias.
import * as bootstrap from 'bootstrap';
import {
  MatDialogRef, // Referencia al diálogo abierto o modal, permite cerrarlo y comunicarse con el componente padre.
  MAT_DIALOG_DATA, // Token para inyectar datos al abrir el diálogo.
  MatDialogModule, // Módulo de Angular Material para modales.
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field'; // Módulo para campos de formulario de Material Design.

import { MatInputModule } from '@angular/material/input'; // Módulo para campos de entrada estilizados de Material Design.

import { MatButtonModule } from '@angular/material/button'; // Módulo para botones estilizados de Material Design.

import {
  FormBuilder, // Servicio para construir formularios de manera más sencilla.
  FormGroup, // Clase para grupos de controles de formulario.
  FormsModule, // Módulo para formularios de plantilla (no se usa en formularios reactivos).
  ReactiveFormsModule, // Módulo para usar formularios reactivos en Angular.
  Validators, // Conjunto de validadores predefinidos para formularios.
} from '@angular/forms';

import { CommonModule } from '@angular/common'; // Módulo que proporciona directivas comunes como ngIf y ngFor.

@Component({
  selector: 'app-add-evento',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-evento.component.html',
  styleUrl: './add-evento.component.css',
})
export class AddEventoComponent {
  formAdd: FormGroup;
  fileError: string | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.formAdd = this.formBuilder.group({
      desc_evento: ['', Validators.required],
      file: [null, Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileError = null; // Reiniciar mensaje de error si hay un archivo this.formAdd.patchValue({ file });
    } else {
      this.fileError = 'Por favor selecciona un archivo';
    }
  }

  submitModal() {
    if (this.formAdd.valid) {
      const formData = new FormData();
      formData.append('desc_evento', this.formAdd.get('desc_evento')?.value);
      formData.append('file', this.formAdd.get('file')?.value);
      // Aquí puedes manejar el envío del formulario, por ejemplo:
      // this.myService.uploadFile(formData).subscribe(response => { ... });
      console.log('Datos enviados:', formData.get('file'));

      // Cerrar el modal
      const modalElement = document.getElementById('modalEvento');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide(); // Cerrar el modal }
      }
    }
  }

  ngOnInit(): void {}
}
