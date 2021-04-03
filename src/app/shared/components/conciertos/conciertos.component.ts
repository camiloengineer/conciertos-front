import { Component, OnInit } from '@angular/core';
import { ConciertosService } from '../../../core/services/conciertos.service';
import { ConciertoModel } from '../../../core/models/concierto.model'
import { Router } from "@angular/router";

@Component({
  selector: 'app-conciertos',
  templateUrl: './conciertos.component.html',
  styleUrls: ['./conciertos.component.sass']
})
export class ConciertosComponent implements OnInit {

  constructor( 
    private conciertosService: ConciertosService,
    private router: Router 
    ) { }

  conciertos: ConciertoModel[] = [];
  cargando = false;

  ngOnInit(): void {
    //Carga el listado de conciertos que se visualizan desde el home
    try {
    this.cargando = true;
    this.conciertosService.getConciertos()
      .subscribe( resp => {
        this.conciertos = resp;
        this.cargando = false;
      });
    }
    catch{
      this.router.navigate(['/home'])
    }
  }

}
