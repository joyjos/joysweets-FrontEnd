import { Component, OnInit } from '@angular/core';

//Servicios
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //En el objeto info almaceno los valores del token, username y los privilegios
  info: any = {};

  constructor(public tokenService:TokenService) {

   }

  ngOnInit(): void {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities(),
      
    };
    
  }

}
