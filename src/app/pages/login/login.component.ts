import { LoginParams } from './../../Models/loginObj.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthTokenService } from '../../services/auth-token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: any = {
    "username": "",
    "password": "",
    "client_secret": "280",
  }

  constructor(private authService: AuthService, private router: Router, private tokenService: AuthTokenService) { }

  onLogin() {
    this.authService.login(this.loginObj.username, this.loginObj.password).subscribe((res: any) => {
      if (res.detail === "OK") {
        // Llamar a onLoginResponse para guardar el token
        this.onLoginResponse(res);

        Swal.fire({
          icon: 'success',
          title: '',
          text: 'Bienvenido.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          showCloseButton: true
        });

        this.router.navigateByUrl("dashboard");
      }
    }, (error) => {
      console.error('Error en la autenticación:', error);
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Ocurrió un error al intentar iniciar sesión, verifique el usuario y contraseña',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
        showCloseButton: true
      });
    });
  }

  private onLoginResponse(tokenData: any): void {
    this.tokenService.saveToken(tokenData.access_token); // Asegúrate de que esto coincide con la respuesta real
    this.tokenService.saveUsername(tokenData.aditional_info.username); // Almacena el nombre de usuario
    this.tokenService.saveTokenType(tokenData.token_type); // Almacena el nombre de usuario

    // console.log("Token guardado:", this.tokenService.getAccessToken());
    // console.log("Usuario:", this.tokenService.getUsername());
    // console.log("Type:", this.tokenService.getTokenType());
  }
}
