import { Routes } from '@angular/router';
// import { MainComponent } from './main/main.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { authGuardGuard } from './guard/auth-guard.guard';



export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  // {path: 'closeSesion', component: LoginComponent},

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path:'dashboard',
        component: DashboardComponent,
        canActivate: [authGuardGuard]
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
