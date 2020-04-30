import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//Sweetalert2
import Swal from 'sweetalert2'

//Servicios
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuarios.model';

//Navegación
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma:FormGroup;

  constructor(public usuario:UsuarioService, public router:Router) { }

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

    this.forma=new FormGroup({
      nombre:new FormControl(null, Validators.required),
      email:new FormControl(null, [Validators.required, Validators.email]),
      password:new FormControl(null, Validators.required),
      password2:new FormControl(null, Validators.required),
      condiciones:new FormControl(false)
    }, {validators: this.sonIguales('password', 'password2')});
  }

  registrarUsuario(){
    
    if(this.forma.invalid){
      return;
    }

    if(!this.forma.value.condiciones){
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
    let usuario=new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    //Llamo al servicio
    this.usuario.crearUsuario(usuario)
      .subscribe(resp=>{
        console.log(resp);
        //Creado el usuario lo mando al login para que pueda loguearse
        this.router.navigate(['/login']);
      })
  }

}
