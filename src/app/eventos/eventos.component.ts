import { Component } from '@angular/core';
import { EventoInterface } from '../Models/eventos.model';
import { EventosDisplayService } from '../services/gestion-eventos.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent {
  eventos: any = [];

  constructor(private getListEventos: EventosDisplayService) {}

  ngOnInit() {
    this.eventos = this.getListEventos.ListarEventos();
  }
}
