import { Component, OnInit } from '@angular/core';
import { ConciertosService } from '../../../core/services/conciertos.service';
import { ConciertoModel } from '../../../core/models/concierto.model'
import Swal from 'sweetalert2';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-conciertos',
  templateUrl: './conciertos.component.html',
  styleUrls: ['./conciertos.component.sass']
})
export class ConciertosComponent implements OnInit {

  constructor( private conciertosService: ConciertosService  ) { }

  conciertos: ConciertoModel[] = [];
  cargando = false;

  ngOnInit(): void {
    this.cargando = true;
    this.conciertosService.getConciertos()
      .subscribe( resp => {
        this.conciertos = resp;
        this.cargando = false;
      });

  }

}
