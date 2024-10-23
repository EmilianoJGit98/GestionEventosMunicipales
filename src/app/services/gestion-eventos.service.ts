import { Injectable } from '@angular/core';
import { EventosMunicipalesService } from './eventos-municipales.service'; // Asegúrate de la ruta correcta al servicio original

@Injectable({
  providedIn: 'root',
})
export class EventosDisplayService {
  constructor(private eventosMunicipalesService: EventosMunicipalesService) {}

  // Método para obtener los eventos
  ListarEventos() {
    return this.eventosMunicipalesService
      .getEventos()
      .filter((evento) => evento.activo === 'True');
  }

  // Otros métodos para manipular eventos pueden ir aquí
}
