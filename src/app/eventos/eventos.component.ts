import { Component } from '@angular/core';
import { EventoInterface } from '../Models/eventos.model';
// import { EventosDisplayService } from '../services/gestion-eventos.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Decodebase64Pipe } from '../pipes/decodebase64.pipe';
import { EventosMunicipalesService } from '../services/eventos-municipales.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule, RouterModule, Decodebase64Pipe],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent {
  eventos: EventoInterface[] = [];

  constructor(
    private servEventos: EventosMunicipalesService
    // private getListEventos: EventosDisplayService

  ) {}

  ngOnInit() {
    this.cargarEventos();
    // this.eventos = this.getListEventos.ListarEventos();
  }

  cargarEventos(): void {
    this.servEventos.getEventos().subscribe(
      (data: EventoInterface[]) => {
        this.eventos = data;
        console.log(this.eventos); // Para verificar que se están recibiendo los eventos
      },
      (error) => {
        console.error('Error al cargar eventos:', error); // Manejo de errores
      }
    );
  }
}
