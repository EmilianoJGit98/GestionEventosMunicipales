import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesServ {

  // private api = 'http://192.168.0.248:8000/api/eventos/';
  private api = 'http://192.168.0.77:8000/api/eventos/';

  constructor(private http: HttpClient) { }

  // Método para obtener actividades por ID
  public FilterActividadesxEvento(idEvento: number): Observable<any> {
    // Convertimos el array de IDs a una cadena separada por comas
    // const idString = idEvento.join(',');
    return this.http.get<any>(`${this.api}${idEvento}`);
  }
}
