import { Injectable } from '@angular/core';
import { EventosMunicipalesService } from './eventos-municipales.service'; // Asegúrate de la ruta correcta al servicio original
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';


@Injectable({
  providedIn: 'root',
})
export class EventosDisplayService {

  constructor(private eventosMunicipalesService: EventosMunicipalesService, private Http: HttpClient, private tokenData: AuthTokenService) {}

  getUserInfo() {
    const username = this.tokenData.getUsername();
    const accessToken = this.tokenData.getAccessToken();
    const tokenType = this.tokenData.getTokenType();
    return { username, accessToken, tokenType }; // Devuelve la información si es necesario
  }

  // private apiUrl = 'http://192.168.0.248:8000/api/eventos';
  // private apiUrl = 'http://192.168.0.77:8000/api/eventos';
  private apiUrl = 'http://192.168.200.113:8002/api/eventos';

  altaEvento(data: any): Observable<any> {
    // Obtienes el token y el tipo de token desde AuthTokenService
    const accessToken = this.tokenData.getAccessToken();
    const tokenType = this.tokenData.getTokenType();

    // data.forEach((value: any, key: string) => {
      // console.log(`Key: ${key}, Value:`, value);
    // });

    // Verifica que ambos valores existan
    if (!accessToken || !tokenType) {
      throw new Error("No se pudo obtener los valores del token.");
    }

    // Crea las cabeceras de la solicitud
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
      Authorization: `${tokenType} ${accessToken}` // Usa el tipo de token y el token de acceso
    });

    // Realiza la petición POST
    return this.Http.post<any>(`${this.apiUrl}/`, data, { headers });
  }

  modificarEvento(data: any): Observable<any> {
    // Obtienes el token y el tipo de token desde AuthTokenService

    const accessToken = this.tokenData.getAccessToken();
    const tokenType = this.tokenData.getTokenType();

    // Verifica que ambos valores existan
    if (!accessToken || !tokenType) {
      throw new Error("No se pudo obtener los valores del token.");
    }

    const headers = new HttpHeaders({
      //'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/json',
      Authorization: `${tokenType} ${accessToken}` // Usa el tipo de token y el token de acceso
    });

    // data.forEach((value: any, key: string) => {
      // console.log(`Key: ${key}, Value:`, value);
    // });

    const id = data.get('id');
    // const id = data.id
    // Realiza la petición POST
    return this.Http.put<any>(`${this.apiUrl}/${id}`, data, { headers });
  }

  cambioEstadoEvento(data: any): Observable<any> {
    // Obtienes el token y el tipo de token desde AuthTokenService
    const accessToken = this.tokenData.getAccessToken();
    const tokenType = this.tokenData.getTokenType();

    // Verifica que ambos valores existan
    if (!accessToken || !tokenType) {
      throw new Error("No se pudo obtener los valores del token.");
    }

    // Crea las cabeceras de la solicitud
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
      Authorization: `${tokenType} ${accessToken}` // Usa el tipo de token y el token de acceso
    });

    const id = data.idEvento
    // console.log(data);
    // Realiza la petición POST
    return this.Http.put<any>(`${this.apiUrl}/estado/${id}`, data, { headers });
  }

  asignarActividades(data: any): Observable<any>{
    const accessToken = this.tokenData.getAccessToken();
    const tokenType = this.tokenData.getTokenType();

     // Verifica que ambos valores existan
     if (!accessToken || !tokenType) {
      throw new Error("No se pudo obtener los valores del token.");
    }

    // Crea las cabeceras de la solicitud
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      Authorization: `${tokenType} ${accessToken}` // Usa el tipo de token y el token de acceso
    });

    // const id = data.id
    // console.log({data});

    return this.Http.post<any>(`${this.apiUrl}/asignar-actividad`, data, { headers });
  }

  eliminarAsignacion(data: any): Observable<any>{
    const accessToken = this.tokenData.getAccessToken();
    const tokenType = this.tokenData.getTokenType();

     // Verifica que ambos valores existan
     if (!accessToken || !tokenType) {
      throw new Error("No se pudo obtener los valores del token.");
    }

    // Crea las cabeceras de la solicitud
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      Authorization: `${tokenType} ${accessToken}` // Usa el tipo de token y el token de acceso
    });

    // const id = data.id
    // console.log({data});

    return this.Http.post<any>(`${this.apiUrl}/desasignar-actividad`, data, { headers });
  }

  // altaEvento(data: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNTIwLDI4MCxHQVJJQ09DSEUgRU1JTElBTk8gSkVTXHUwMGRhUyw0MDg3MjY3NSxBZ2VuY2lhIGRlIFJlY2F1ZGFjaVx1MDBmM24sMzYsMTA1LEFyZWEgQ29tZXJjaW8sMSIsImV4cCI6MTczMDUwOTQ5MH0.Mlfp45zoSF3yex_ZCHohowEdWnbX7vKBSKTL0kBdttY` });
  //   return this.Http.post<any>(this.apiUrl+'/', data, { headers });
  // }

  // Método para obtener los eventos
  // ListarEventos() {
  //   return this.eventosMunicipalesService
  //     .getEventos()
  //     .filter((evento) => evento.activo === 'True');
  // }

  // Otros métodos para manipular eventos pueden ir aquí
}
