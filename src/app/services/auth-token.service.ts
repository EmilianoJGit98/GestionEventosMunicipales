import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  // private accessToken: string | null = null;
  // private expiresIn: number | null = null;
  // private tokenType: string | null = null;
  // private username: string | null = null;
  // private additionalInfo: any = null;

  private readonly TOKEN_KEY = 'access_token';
  private readonly USERNAME_KEY = 'username';
  private readonly TOKEN_TYPE = 'tokenType';

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getTokenType(): string | null {
    return localStorage.getItem(this.TOKEN_TYPE);
  }

  saveTokenType(tokentype: string) {
    localStorage.setItem(this.TOKEN_TYPE, tokentype);
  }


  saveUsername(username: string) {
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.TOKEN_TYPE);
    // Aquí puedes agregar más acciones si es necesario
  }

  // saveToken(data: any): void {
  //   this.accessToken = data.access_token;
  //   this.expiresIn = data.expires_in;
  //   this.tokenType = data.token_type;
  //   this.additionalInfo = data.aditional_info;

  //   // Puedes extraer el 'username' si lo necesitas
  //   this.username = this.additionalInfo.username;
  // }

  // // Métodos para obtener los datos
  // getAccessToken(): string | null {
  //   return this.accessToken;
  // }

  // getUsername(): string | null {
  //   return this.username;
  // }

  // getType(): string | null {
  //   return this.tokenType;
  // }

  // Agrega aquí otros métodos según sea necesario
}
