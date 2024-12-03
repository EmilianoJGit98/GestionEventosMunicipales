import { Routes } from '@angular/router';
// import { MainComponent } from './main/main.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { AsignarActividadesComponent } from './pages/asignar-actividades/asignar-actividades.component';
import { ActividadesAsignadasComponent } from './pages/actividades-asignadas/actividades-asignadas.component';



export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      // {
      //   path: '',
      //   component: EventosComponent,
      // },
      {
        path: 'eventos',
        component: EventosComponent,
      },
      {
        path: 'eventos/actividades/:id',
        component: ActividadesComponent,
      },
      {
        path: 'eventos/asignarA/:id',
        component: AsignarActividadesComponent,
      },
      {
        path: 'eventos/asignarA/:id',
        component: AsignarActividadesComponent,
      },
      {
        path: 'eventos/actividades/:idEvento/:idRubro',
        component: ActividadesComponent,
      },
      {
        path: 'eventos/actividades-asignadas/:idEvento',
        component: ActividadesAsignadasComponent,
      },
    ],
  },
];
