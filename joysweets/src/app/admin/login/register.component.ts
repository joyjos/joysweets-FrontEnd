import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//Modelos
import { NuevoUsuario } from '../models/NuevoUsuario';

//Sweetalert2
import Swal from 'sweetalert2';

//Servicios
import { AuthService } from '../services/auth.service';

//Navegación
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;

  constructor(public authService:AuthService, public router:Router) { }

  //Método para comprobar si dos campos son iguales
  sonIguales(campo1:string, campo2:string){
    return(group:FormGroup)=>{
      let pass1=group.controls[campo1].value;
      let pass2=group.controls[campo2].value;

      if(pass1===pass2){
        return null;
      }

      return{
        sonIguales:true
      }
    }
  }

  ngOnInit(): void {

    //Validaciones
    this.form=new FormGroup({
      nombre:new FormControl(null, Validators.required),
      username:new FormControl(null, [Validators.required, Validators.email]),
      password:new FormControl(null, Validators.required),
      password2:new FormControl(null, Validators.required),
      condiciones:new FormControl(false)
    }, {validators: this.sonIguales('password', 'password2')});
  }

  //===================================
  //Método para registrar un usuario
  //===================================
  registrarUsuario(){
    
    //Compruebo que el formulario es válido
    if(this.form.invalid){
      return;
    }

    if(!this.form.value.condiciones){
      Swal.fire({
        title: 'Importante',
        text: 'Debes aceptar las condiciones',
        icon: 'warning'
      });
      return;
    }

    //console.log('Forma válida', this.forma.valid);
    //console.log(this.forma.value);

    //Creo un objeto de tipo Usuario
    let nuevoUsuario=new NuevoUsuario(
      this.form.value.nombre,
      this.form.value.username,
      this.form.value.password
    );

    //Cargo el urlComentario del Local Storage
    let idPost=parseInt(localStorage.getItem('urlComentario'));
    console.log(idPost);

    //Llamo al servicio
    this.authService.nuevo(nuevoUsuario)
      .subscribe(resp=>{
        //console.log(resp);
        
        //Si llego a register por un comentario
        if(idPost){
          this.router.navigate(['/loginUrl/'+ idPost]);
        }else{
          //Creado el usuario lo mando al login para que pueda loguearse
          this.router.navigate(['/login']);
        }
      },
      error=>{
        console.log(error.status);
        Swal.fire('Error', 'Ya existe un usuario con el Email <br><span style="color:#197AAA">'+this.form.value.username+'</span>', 'error');
      });
  }

}
