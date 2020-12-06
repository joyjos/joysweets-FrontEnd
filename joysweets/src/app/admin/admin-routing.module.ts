import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { ComentarioComponent } from './pages/comentarios/comentario.component';
import { PostComponent } from './pages/posts/post.component';
import { PostNuevoComponent } from './pages/posts/post-nuevo.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuarioComponent } from './pages/usuarios/usuario.component';
import { LoginUrlComponent } from './login/login-url.component';

//Guard
import { LoginGuard } from './services/guards/login.guard';
import { AdminGuard } from './services/guards/admin.guard';

const adminRoutes:Routes=[
     {
         path: 'admin', component: AdminComponent,
         canActivate: [LoginGuard],
         children: [
            {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
                
            //Mantenimientos
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'}},
            {path: 'posts', component: PostsComponent, data: {titulo: 'Recetas'}},
            {path: 'comentarios', component: ComentariosComponent, data: {titulo: 'Comentarios'}},
            {path: 'comentario/:id', component: ComentarioComponent, data: {titulo: 'Actualizar Comentario'}},
            {path: 'post/:id', component: PostComponent, data: {titulo: 'Actualizar Receta'}},
            {path: 'usuario/:id', component: UsuarioComponent, data: {titulo: 'Actualizar Usuario'}},
            {path: 'postNuevo', component: PostNuevoComponent, data: {titulo: 'Nueva Receta'}}   
        ],       
     },
     {path: 'login', component: LoginComponent},
     {path: 'loginUrl/:id', component: LoginUrlComponent},
     {path: 'register', component: RegisterComponent},
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }