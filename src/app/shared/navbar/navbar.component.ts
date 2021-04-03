import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  collapse: boolean = true;

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }
  //redirige al componente de búsqueda
  buscarConcierto( termino: string) {
    this.router.navigate(['/buscar', termino]);
  }

}
