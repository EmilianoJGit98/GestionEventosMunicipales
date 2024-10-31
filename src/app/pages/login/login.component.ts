import { LoginParams } from './../../Models/loginObj.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj:any = {
    "username": "",
    "password": "",
    "client_secret": "280",
  }


  // formLogin: FormGroup;

  constructor(private authService: AuthService, private router: Router){};

  onLogin() {
    this.authService.login(this.loginObj.username, this.loginObj.password).subscribe((res: any) => {
      if (res.detail === "OK") {
        console.log(res)

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

        this.router.navigate(['/dashboard']);
      }
    }, (error) => {
      console.error('Error en la autenticación:', error);
      // alert("Ocurrió un error al intentar iniciar sesión, berifique el usuario y contraseña.");
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Ocurrió un error al intentar iniciar sesión, berifique el usuario y contraseña',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        // timer: 3000,
        timerProgressBar: true,
        showCloseButton: true
      });
    });
  }


  // http = inject(HttpClient);

  // onLogin() {
  //   // Convirtiendo loginObj a application/x-www-form-urlencoded
  //   const body = new URLSearchParams();

  //   for (const key in this.loginObj) {
  //     if (this.loginObj.hasOwnProperty(key) && this.loginObj[key] !== undefined) {
  //       body.append(key, this.loginObj[key]);
  //     }
  //   }

  //   console.log(this.loginObj);

  //   this.http.post('http://192.168.0.248:8000/api/auth', body.toString(), {
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  //   }).subscribe((res: any) => {
  //     if (res.detail === "OK") {
  //       alert("clave correcta");
  //     } else if(res.status === 400) {
  //       alert("clave incorrecta");
  //     }
  //   });
  // }

  // onLogin(){
  //   // debugger;
  //   console.log(this.loginObj)
  //   this.http.post('http://192.168.0.248:8000/api/auth', JSON.stringify(this.loginObj)).subscribe((res:any)=>{
  //     if (res.token) {
  //       alert("loginOK");
  //     } else {
  //       alert("error login");
  //     }
  //   })
  // }

}
