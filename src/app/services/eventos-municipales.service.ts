import { EventoInterface } from './../Models/eventos.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { RubroInterface } from '../Models/rubros.model';
import { SubRubroInterface } from '../Models/subrurbros.model';
import { ActividadAsignadaInterface } from '../Models/actividad-asignada.model';
import { environment } from '../../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class EventosMunicipalesService {
  private apiUrl = `${environment.base_url+'/eventos'}`;
  // private apiUrl = 'http://192.168.0.248:8000/api/eventos';
  // private apiUrl = 'http://192.168.0.77:8000/api/eventos';
  // private apiUrl = 'http://192.168.200.113:8002/api/eventos';

  idRubro: number = 0;
  activo: number = 0;
  idEvento: number = 0;

  constructor(private http: HttpClient) { }

  // getEventos(): Observable<EventoInterface[]> {
  //   return this.http.get<EventoInterface[]>(this.apiUrl);
  // }

  getEventos(estado: number): Observable<EventoInterface[]> {
    this.activo = estado;
    return this.http.get<EventoInterface[]>(this.apiUrl+'?activo='+this.activo);
  }

  getRubros(): Observable<RubroInterface[]>{
    return this.http.get<RubroInterface[]>(this.apiUrl+'/rubros')
  }

  getSubRubros(idRubro: number): Observable<SubRubroInterface[]> {
    this.idRubro = idRubro;
    return this.http.get<SubRubroInterface[]>(`${this.apiUrl}/subrubros/${this.idRubro}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          // Maneja el error 404 aquí
          return of([]); // Devuelve un array vacío en caso de no encontrar subrubros
        } else {
          // Si es un error diferente, puedes lanzarlo nuevamente
          return throwError(error); // O manejarlo de otra forma
        }
      })
    );
  }

  getActividadesAsignadas(idEvento: number): Observable<ActividadAsignadaInterface[]> {
    this.idEvento = idEvento;
    return this.http.get<ActividadAsignadaInterface[]>(`${this.apiUrl}/actividades/${this.idEvento}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          // Maneja el error 404 aquí
          return of([]); // Devuelve un array vacío en caso de no encontrar subrubros
        } else {
          // Si es un error diferente, puedes lanzarlo nuevamente
          return throwError(error); // O manejarlo de otra forma
        }
      })
    );
  }
}
