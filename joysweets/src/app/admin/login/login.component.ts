import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

//Servicios
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

import { LoginUsuario } from '../models/LoginUsuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  recuerdame:boolean=false;

  constructor(public router:Router, public auth:AuthService, public token:TokenService) { }

  ngOnInit(): void {
    
    //Le paso el valor al campo de l formulario
    this.username=localStorage.getItem('username') || '';

    //Si el campo username tiene algo, quiero que esté seleccionado el Recuérdame
    if(this.username.length>1){
      this.recuerdame=true;
    }
  }

  ingresar(forma:NgForm){
    console.log(forma.valid);
    console.log(forma.value);

    if(forma.invalid){
      return;
    }

    //Creo un objeto de tipo LoginUsuario
    let loginUsuario=new LoginUsuario(
      forma.value.username,
      forma.value.password
      );

      //Llamo al servicio
      this.auth.login(loginUsuario, forma.value.recuerdame)
        .subscribe((resp:any)=>{
          console.log(resp);

          //Almaceno los valores en Session Storage
          this.token.setToken(resp.token);
          this.token.setUserName(resp.username);
          this.token.setAuthorities(resp.authorities);

          //Si las credenciales son correctas redirecciono al dashboard
          this.router.navigate(['/admin/dashboard']);
        });
  }

}
