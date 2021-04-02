import { Component, OnInit } from '@angular/core';
import { ConciertosService } from '../../../core/services/conciertos.service';
import { ConciertoModel } from '../../../core/models/concierto.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conciertos',
  templateUrl: './conciertos.component.html',
  styleUrls: ['./conciertos.component.sass']
})
export class ConciertosComponent implements OnInit {

  constructor( private ConciertosService: ConciertosService  ) { }

  conciertos: ConciertoModel[] = [];
  cargando = false;

  ngOnInit(): void {
    this.cargando = true;
    this.ConciertosService.getConciertos()
      .subscribe( resp => {
        this.conciertos = resp;
        this.cargando = false;
      });

  }

}
