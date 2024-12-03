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
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: any = {
    username: '',
    password: '',
    client_secret: '280',
  };

  LoginData: any[] = [];

  constructor(private router: Router, private tokenService: AuthTokenService) {}

  ngOnInit() {
    this.tokenService.logout();
  }

  onLogin() {
    this.tokenService
      .login(this.loginObj.username, this.loginObj.password)
      .subscribe(
        (res: any) => {
          if (res.detail === 'OK') {
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
              showCloseButton: true,
            });

            this.router.navigateByUrl('layout');
            // this.router.navigateByUrl("dashboard");
          }
        },
        (error) => {

          if (error) {
            const excepcionLogin: any = {
              'USUARIO DE BAJA':
                'El usuario está deshabilitado, comuniquese con el administrador', // [400]
              'Token Expirado.':
                'La sesión caducó, por favor vuelva a iniciar sesión.', // [401]
              'CLAVE INCORRECTA':
                'Clave Incorrecta.', // [400]
              'USUARIO INEXISTENTE':
                'No se encontró el usuario ingresado, intente con otro.', // [404]
              'NO TIENE ACCESO AL MODULO':
                'El usuario no cuenta con los permisos necesarios.', // [405]
              'USUARIO BLOQUEADO POR INTENTOS INCORRECTOS':
                'El usuario se bloqueó debido a que supero la cantidad de intentos fallidos.', // [423]
              'CLAVE VENCIDA':
                'La contraseña se encuentra expirada, comuniquese con el administrador.', // [426]
            };

             // Mostrar el mensaje de error correspondiente
        const errorMessage = excepcionLogin[error.detail] || error.detail || "Ocurrió un error inesperado.";


            Swal.fire({
              icon: 'error',
              title: '',
              text: errorMessage,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timerProgressBar: true,
              showCloseButton: true,
            });
          }
        }
      );
  }

  private onLoginResponse(tokenData: any): void {
    this.tokenService.saveDataLogin(tokenData);

    this.tokenService.saveToken(tokenData.access_token); // Asegúrate de que esto coincide con la respuesta real
    this.tokenService.saveUsername(tokenData.username); // Almacena el nombre de usuario
    this.tokenService.saveTokenType(tokenData.token_type); // Almacena el nombre de usuario
  }
}
