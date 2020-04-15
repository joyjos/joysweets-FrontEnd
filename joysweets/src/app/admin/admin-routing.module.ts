import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

const adminRoutes:Routes=[
    // {
    //     path: 'admin', component: AdminComponent,
    //     children: [
    //         {path: 'dashboard', component: DashboardComponent},          
    //         {path: '',  pathMatch: 'full', redirectTo: 'dashboard'}
    //     ]
    // },
    // {path: 'login', component: LoginComponent},
    // {path: 'register', component: RegisterComponent},
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }