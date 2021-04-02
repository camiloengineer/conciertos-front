import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConciertoModel } from '../../../core/models/concierto.model';
import { ConciertosService } from '../../../core/services/conciertos.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.sass']
})
export class BuscadorComponent implements OnInit {

  conciertos: ConciertoModel[] = [];
  termino: string;

  constructor( private activatedRoute: ActivatedRoute,
               private conciertoService: ConciertosService,
               private router: Router ) {

    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.conciertoService.getConciertos().subscribe(resp => {
        this.conciertos = resp;
        let conciertosArr: ConciertoModel[] = [];
        this.termino =  params['termino'].toLowerCase();
        console.log(this.conciertos);
        for (let concierto of this.conciertos) {
          let nombre: string = concierto.nombre.toLowerCase();

          for(let artista of concierto.artistas){
            let nombre: string = artista.toLowerCase();

            if (nombre.indexOf( this.termino ) >= 0) {
              conciertosArr.push(concierto);
            }
          }
        }
        this.conciertos = conciertosArr;
      });
    });
  }

  verConcierto( id: string ){
    this.router.navigate( ['/concierto', id])
  }

}
