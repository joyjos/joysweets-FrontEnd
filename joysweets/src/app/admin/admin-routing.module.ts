import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { PostComponent } from './pages/posts/post.component';

//Guard
import { LoginGuard } from './services/guards/login.guard';

const adminRoutes:Routes=[
     {
         path: 'admin', component: AdminComponent,
         canActivate: [LoginGuard],
         children: [
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'},
                //Mantenimientos
                children: [
                    {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'}},
                    {path: 'posts', component: PostsComponent, data: {titulo: 'Mantenimiento de Recetas'}},
                    {path: 'comentarios', component: ComentariosComponent, data: {titulo: 'Mantenimiento de Comentarios'}},
                    {path: 'post/:id', component: PostComponent, data: {titulo: 'Actualizar Receta'}}
                ]
         },      
            {path: '',  pathMatch: 'full', redirectTo: 'dashboard'}
         ]
     },
     {path: 'login', component: LoginComponent},
     {path: 'register', component: RegisterComponent},
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }