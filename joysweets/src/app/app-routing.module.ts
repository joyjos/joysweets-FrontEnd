import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegisterComponent } from './admin/login/register.component';

//Guard
import { LoginGuard } from './admin/services/guards/login.guard';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    canActivate: [LoginGuard],
    children: [
        {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},          
        {path: '',  pathMatch: 'full', redirectTo: 'dashboard'}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '', component: PagesComponent,
  // {path: 'home', component: HomeComponent},
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'blog', component: BlogComponent},
      {path: 'receta/:id', component: RecetaComponent},
      {path: 'contacto', component: ContactoComponent},
      {path: '**',  pathMatch: 'full', redirectTo: 'home'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
