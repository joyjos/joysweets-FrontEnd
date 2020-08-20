import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

//Rutas
import { AppRoutingModule } from './app-routing.module';

//Módulos
import { HttpClientModule} from '@angular/common/http';
import { AdminModule } from './admin/admin.module';

//Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

//Cambiar idioma a castellano
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
registerLocaleData(localeES, 'es');

//Formularios
import { FormsModule} from '@angular/forms';

//Pipes
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    RecetaComponent,
    ContactoComponent,
    NopagefoundComponent,
    PagesComponent,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AdminModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
