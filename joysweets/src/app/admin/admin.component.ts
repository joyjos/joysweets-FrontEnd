import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title = 'joysweets';

  //Cargo los archivos js
  ngOnInit() {
    this.loadScript('../../assets/plugins/jquery/jquery.min.js');
    this.loadScript('../../assets/plugins/bootstrap/js/popper.min.js');
    this.loadScript('../../assets/plugins/bootstrap/js/bootstrap.min.js');
    this.loadScript('../../assets/js/perfect-scrollbar.jquery.min.js');
    this.loadScript('../../assets/js/waves.js');
    this.loadScript('../../assets/js/sidebarmenu.js');
    this.loadScript('../../assets/plugins/sticky-kit-master/dist/sticky-kit.min.js');
    this.loadScript('../../assets/plugins/sparkline/jquery.sparkline.min.js');
    this.loadScript('../../assets/js/custom.min.js');
    this.loadScript('../../assets/plugins/Magnific-Popup-master/dist/jquery.magnific-popup.min.js');
    this.loadScript('../../assets/plugins/Magnific-Popup-master/dist/jquery.magnific-popup-init.js');
    this.loadScript('../../assets/plugins/styleswitcher/jQuery.style.switcher.js');
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}