import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

//Componentes
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { RecetaComentarioComponent } from './pages/receta/receta-comentario.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PrivacidadComponent } from './pages/privacidad/privacidad.component';
import { AvisoLegalComponent } from './pages/aviso-legal/aviso-legal.component';
import { CookiesComponent } from './pages/cookies/cookies.component';

const routes: Routes = [
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
