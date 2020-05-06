import { Component, OnInit } from '@angular/core';

//Servicios
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //En el objeto info almaceno los valores del token, username y los privilegios
  info: any = {};

  constructor(public auth:AuthService, public tokenService:TokenService) { }

  ngOnInit(): void {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities(),
    };
  }

}
