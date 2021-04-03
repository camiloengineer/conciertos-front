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

  constructor(private activatedRoute: ActivatedRoute,
    private conciertoService: ConciertosService,
    private router: Router) {

  }

  ngOnInit(): void {
    //Obtiene el texto ingresado en el input del navbar y recorre buscando coincidencias 
    //en las letras del nombre de los artistas del listado de conciertos
    try {
      this.activatedRoute.params.subscribe(params => {
        this.conciertoService.getConciertos().subscribe(resp => {
          this.conciertos = resp;
          let conciertosArr: ConciertoModel[] = [];
          this.termino = params['termino'].toLowerCase();
          for (let concierto of this.conciertos) {
            let nombre: string = concierto.nombre.toLowerCase();

            for (let artista of concierto.artistas) {
              let nombre: string = artista.toLowerCase();

              if (nombre.indexOf(this.termino) >= 0) {
                conciertosArr.push(concierto);
              }
            }
          }
          this.conciertos = conciertosArr;
        });
      });
    }
    catch {
      //Esto se podría implementar en un logger
    }
  }

  verConcierto(id: string) {
    this.router.navigate(['/concierto', id])
  }

}
