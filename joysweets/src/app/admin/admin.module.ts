import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Rutas
import { AdminRoutingModule } from './admin-routing.module';

//Componentes
import { AdminComponent} from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { PostComponent } from './pages/posts/post.component';
import { PostNuevoComponent } from './pages/posts/post-nuevo.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

//Módulos
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Interceptor
import { interceptorProvider } from './services/interceptor.service';
import { ComentarioComponent } from './pages/comentarios/comentario.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    UsuariosComponent,
    PostsComponent,
    ComentariosComponent,
    PostComponent,
    PostNuevoComponent,
    PerfilComponent,
    ComentarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
  ],
  exports: [
    DashboardComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    interceptorProvider
  ]
})
export class AdminModule { }
