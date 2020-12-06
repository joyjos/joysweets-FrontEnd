import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

//Servicios
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

//Modelos
import { LoginUsuario } from '../models/LoginUsuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  recuerdame:boolean=false;

  constructor(public router:Router, public authService:AuthService, public tokenService:TokenService) { }

  ngOnInit(): void {
    
    //Le paso el valor al campo del formulario
    this.username=localStorage.getItem('username') || '';

    //Si el campo username tiene algo, quiero que esté seleccionado el Recuérdame
    if(this.username.length>1){
      this.recuerdame=true;
    }
  }

  ingresar(form:NgForm){
    //console.log(form.valid);
    //console.log(form.value);

    if(form.invalid){
      return;
    }

    //Creo un objeto de tipo LoginUsuario
    let loginUsuario=new LoginUsuario(
      form.value.username,
      form.value.password
      );

      //Llamo al servicio
      this.authService.login(loginUsuario, form.value.recuerdame)
        .subscribe((resp:any)=>{
          //console.log(resp);

          //Almaceno los valores en Local Storage
          this.tokenService.setToken(resp.token);
          this.tokenService.setUserName(resp.username);
          this.tokenService.setAuthorities(resp.authorities);

          // //Compruebo si existe en Local Storage la clave urlComentario
          // let urlComentario=localStorage.getItem('urlComentario');
          
          // if(urlComentario){ //Si existe redirecciono para hacer el comentario 
          //   this.router.navigate(['/recetaComentario/'+urlComentario]);
          // }else{
          //   //Si las credenciales son correctas redirecciono al dashboard
          //   this.router.navigate(['/admin/dashboard']);
          // }
          this.router.navigate(['/admin/perfil']);
          
        },
        error=>{
          console.log(error.status);
          Swal.fire('Error', 'La cuenta o la contraseña es incorrecta', 'error');
        });
 
  }

}
