import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { RecetaComentarioComponent } from './pages/receta/receta-comentario.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegisterComponent } from './admin/login/register.component';
import { PrivacidadComponent } from './pages/privacidad/privacidad.component';
import { AvisoLegalComponent } from './pages/aviso-legal/aviso-legal.component';
import { CookiesComponent } from './pages/cookies/cookies.component';

//Guard
import { LoginGuard } from './admin/services/guards/login.guard';

const routes: Routes = [
  // {
  //   path: 'admin', component: AdminComponent,
  //   canActivate: [LoginGuard],
  //   children: [
  //       {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
  //       //Mantenimientos
  //       {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'}},      
  //       {path: '',  pathMatch: 'full', redirectTo: 'dashboard'}
  //   ]
  // },
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {
    path: '', component: PagesComponent,
  // {path: 'home', component: HomeComponent},
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'blog', component: BlogComponent},
      {path: 'receta/:id', component: RecetaComponent},
      {path: 'recetaComentario/:id', component: RecetaComentarioComponent},
      {path: 'contacto', component: ContactoComponent},
      {path: 'avisoLegal', component: AvisoLegalComponent},
      {path: 'privacidad', component: PrivacidadComponent},
      {path: 'cookies', component: CookiesComponent},
      {path: '', pathMatch: 'full', redirectTo: 'home'},
    ]
  },
  {path: '**', component:NopagefoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
