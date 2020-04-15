import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Rutas
import { AdminRoutingModule } from './admin-routing.module';

//Componentes
import { AdminComponent} from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//Módulos
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  exports: [
    DashboardComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AdminModule { }
