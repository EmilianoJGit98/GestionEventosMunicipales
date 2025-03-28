import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadesServ {
  private apiUrl = `${environment.base_url+'/eventos'}`;
  // private api = 'http://192.168.0.248:8000/api/eventos/';
  // private api = 'http://192.168.0.77:8000/api/eventos/';
  // private api = 'http://192.168.200.113:8002/api/eventos/';

  constructor(private http: HttpClient) { }

  // Método para obtener actividades por ID
  public FilterActividadesxEvento(idEvento: number): Observable<any> {
    // Convertimos el array de IDs a una cadena separada por comas
    // const idString = idEvento.join(',');
    return this.http.get<any>(`${this.apiUrl}/${idEvento}`);
  }
}
