import { Routes } from '@angular/router';
// import { MainComponent } from './main/main.component';
// import { EventosComponent } from './eventos/eventos.component';
// import { ActividadesComponent } from './actividades/actividades.component';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';



export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path:'dashboard',
        component: DashboardComponent
      }
    ]
  }

  // {path: 'main', component: MainComponent,
  //   children:  [
  //     { path: '', component: EventosComponent},
  //     { path: 'eventos', component: EventosComponent},
  //     { path: 'actividades/:idEvento', component: ActividadesComponent}
  //   ],
  // },
];
