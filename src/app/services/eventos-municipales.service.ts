import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventosMunicipalesService {
  constructor() {}

  eventos = [
    {
      id: 1,
      nombre: 'Actividades Generales',
      imagen: '',
      fechaDesde: null,
      fechaHasta: null,
      activo: 'True',
    },
    {
      id: 2,
      nombre: 'OktoberFest',
      imagen: '',
      fechaDesde: null,
      fechaHasta: null,
      activo: 'True',
    },
  ];

  getEventos() {
    return this.eventos;
  }
}
