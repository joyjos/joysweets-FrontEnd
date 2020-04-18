import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma:FormGroup;

  constructor(public router:Router) { }

  ngOnInit(): void {
    this.forma=new FormGroup({
      email:new FormControl(null, [Validators.required, Validators.email]),
      password:new FormControl(null, Validators.required),
      recuerdame:new FormControl(false)
    });
  }

  ingresar(){
    console.log(this.forma.valid);
    console.log(this.forma.value);
    this.router.navigate(['/admin/dashboard']);
  }

}
