import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ActividadesServ } from '../services/actividades-municipales.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule // Agregar HttpClientModule aquí
  ],
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'] // Asegúrate de que sea styleUrls aquí
})
export class ActividadesComponent implements OnInit {
  IdEvento: number = 1;
  arrayActividades: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private getActividades: ActividadesServ
  ) { }

  ngOnInit(): void {
    this.IdEvento = +this.route.snapshot.paramMap.get('idEvento')!; // Convierte a número
    console.log(this.IdEvento);
    this.getActividadesxEvento(this.IdEvento);
  }

  getActividadesxEvento(idEvento: number): void {
    this.getActividades.FilterActividadesxEvento(idEvento).subscribe(
      (data: any) => {
        this.arrayActividades = data; // Asigna los datos recibidos a la variable
        console.log(this.arrayActividades);
      },
      (error: string) => {
        console.error('Error al obtener actividades:', error);
      }
    );
  }
}
