import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ConciertosService } from '../../../core/services/conciertos.service';
import { ConciertoModel } from '../../../core/models/concierto.model';

@Component({
  selector: 'app-concierto',
  templateUrl: './concierto.component.html',
  styleUrls: ['./concierto.component.sass']
})
export class ConciertoComponent implements OnInit {

  concierto: ConciertoModel;
  id: string = null;
  suscribeService: any = null;
  deleted: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private conciertoService: ConciertosService
  ) { };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

      this.conciertoService.getConcierto( id )
        .subscribe( (resp: ConciertoModel) => {
          this.concierto = resp;
          this.concierto.id = Number(id);

          console.log(this.concierto);
        });
  }

  eliminarConcierto() {
    console.log(this.id);
  }

  irHome(){
    
  }

}
