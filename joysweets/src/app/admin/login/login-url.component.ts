import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//Servicios
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

//Modelos
import { LoginUsuario } from '../models/LoginUsuario';

@Component({
  selector: 'app-login-url',
  templateUrl: './login-url.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginUrlComponent implements OnInit {

  username:string;

  constructor(public router:Router, public authService:AuthService, public tokenService:TokenService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    //Le paso el valor al campo del formulario
    this.username=localStorage.getItem('username') || '';

    this.activatedRoute.params
      .subscribe(params=>{
        console.log(params['id']);

        //Guardo en Local Storage la receta donde voy a dejar el comentario
        localStorage.setItem('urlComentario', params['id']);
      });
  }

  ingresar(forma:NgForm){
    //console.log(forma.valid);
    //console.log(forma.value);

    if(forma.invalid){
      return;
    }

    //Creo un objeto de tipo LoginUsuario
    let loginUsuario=new LoginUsuario(
      forma.value.username,
      forma.value.password
      );

      //Llamo al servicio
      this.authService.login(loginUsuario, forma.value.recuerdame)
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
          let urlComentario=localStorage.getItem('urlComentario');
          this.router.navigate(['/recetaComentario/'+urlComentario]);
          
        });

        
  }

}
