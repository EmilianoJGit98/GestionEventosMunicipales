import { EventoInterface } from './../Models/eventos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RubroInterface } from '../Models/rubros.model';
import { SubRubroInterface } from '../Models/subrurbros.model';



@Injectable({
  providedIn: 'root'
})
export class EventosMunicipalesService {
  // private apiUrl = 'http://192.168.0.248:8000/api/eventos';
  private apiUrl = 'http://192.168.0.77:8000/api/eventos';

  idRubro: number = 0;

  constructor(private http: HttpClient) { }

  getEventos(): Observable<EventoInterface[]> {
    return this.http.get<EventoInterface[]>(this.apiUrl);
  }

  getRubros(): Observable<RubroInterface[]>{
    return this.http.get<RubroInterface[]>(this.apiUrl+'/rubros')
  }

  getSubRubros(idRubro: number): Observable<SubRubroInterface[]>{
    this.idRubro = idRubro;
    return this.http.get<SubRubroInterface[]>(this.apiUrl+'/subrubros/'+this.idRubro)
  }
}
