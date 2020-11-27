import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'joysweets';

  cookieMessage="Este sitio web utiliza cookies para garantizar que obtenga la mejor experiencia. Para más información consulta nuestra";
  cookieDismiss="Acepto";
  cookieLinkText="Política de Cookies";

  ngOnInit(): void {
    let cc = window as any;
       cc.cookieconsent.initialise({
         palette: {
           popup: {
             background: "#F7AFBE",
             text: "#67757c",
           },
           button: {
             background: "#F8DCE0",
             text: "#67757c"
           }
         },
         theme: "classic",
         content: {
           message: this.cookieMessage,
           dismiss: this.cookieDismiss,
           link: this.cookieLinkText,
           href:"/cookies"
         }
       });
  }
}
