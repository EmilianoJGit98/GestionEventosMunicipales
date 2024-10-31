import { Injectable } from '@angular/core';
import { EventosMunicipalesService } from './eventos-municipales.service'; // Asegúrate de la ruta correcta al servicio original
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventosDisplayService {
  constructor(private eventosMunicipalesService: EventosMunicipalesService, private Http: HttpClient) {}

  private apiUrl = 'http://192.168.0.248:8000/api/eventos';

  altaEvento(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.Http.post<any>(this.apiUrl+'/', data, { headers });
  }

  // Método para obtener los eventos
  // ListarEventos() {
  //   return this.eventosMunicipalesService
  //     .getEventos()
  //     .filter((evento) => evento.activo === 'True');
  // }

  // Otros métodos para manipular eventos pueden ir aquí
}
