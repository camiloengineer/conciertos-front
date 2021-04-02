import { ConciertoModel } from '../../../core/models/concierto.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-concierto-tarjeta',
  templateUrl: './concierto-tarjeta.component.html',
  styleUrls: ['./concierto-tarjeta.component.sass']
})
export class ConciertoTarjetaComponent implements OnInit {

  @Input() concierto: ConciertoModel;

  constructor( private router: Router) { }

  ngOnInit(): void {

  }

  verConcierto(): void {
    this.router.navigate( ['/detail', this.concierto.id]);
  }
}
