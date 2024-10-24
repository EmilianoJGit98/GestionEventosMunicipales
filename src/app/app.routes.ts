import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EventosComponent } from './eventos/eventos.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


export const routes: Routes = [
  { path: '', component: MainComponent,
    children:  [
      { path: '', component: EventosComponent},
      { path: 'eventos', component: EventosComponent},
      { path: 'actividades/:idEvento', component: ActividadesComponent}
    ],
   },
];
