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
import { ComentarioComponent } from './pages/comentarios/comentario.component';
import { UsuarioComponent } from './pages/usuarios/usuario.component';
import { LoginUrlComponent } from './login/login-url.component';

//Módulos
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

//Interceptor
import { interceptorProvider } from './services/interceptor.service';

//Pipes
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { FilterPostPipe } from './pipes/filter-post.pipe';
import { FilterCommentPipe } from './pipes/filter-comment.pipe';
import { RolPipe } from './pipes/rol.pipe';
import { TruncateRecetaPipe } from './pipes/truncate-receta.pipe';
import { Sort2Pipe } from './pipes/sort2.pipe';

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
    ComentarioComponent,
    FilterUserPipe,
    FilterPostPipe,
    FilterCommentPipe,
    UsuarioComponent,
    RolPipe,
    TruncateRecetaPipe,
    Sort2Pipe,
    LoginUrlComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
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
