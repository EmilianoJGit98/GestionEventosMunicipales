import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginObj = {
      username,
      password,
      client_secret: '280'
    };

    const body = new URLSearchParams();

    Object.entries(loginObj).forEach(([key, value]) => {
      if (value !== undefined) {
        body.append(key, value);
      }
    });

    // return this.http.post('http://192.168.0.77:8000/api/auth', body.toString(), {
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // });
    return this.http.post('http://192.168.200.113:8002/api/auth', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
}
