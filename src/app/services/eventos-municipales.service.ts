import { EventoInterface } from './../Models/eventos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EventosMunicipalesService {
  private apiUrl = 'http://192.168.0.248:8000/api/eventos';

  constructor(private http: HttpClient) { }

  getEventos(): Observable<EventoInterface[]> {
    return this.http.get<EventoInterface[]>(this.apiUrl);
  }

}
