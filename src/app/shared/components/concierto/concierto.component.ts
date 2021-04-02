import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ConciertosService } from '../../../core/services/conciertos.service';
import { ConciertoModel } from '../../../core/models/concierto.model';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-concierto',
  templateUrl: './concierto.component.html',
  styleUrls: ['./concierto.component.sass']
})
export class ConciertoComponent implements OnInit {

  concierto: ConciertoModel;
  id: string = null;
  suscribeService: any = null;
  eliminado: Boolean = false;
  cargando = false;

  constructor(private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private conciertoService: ConciertosService
  ) { };

  ngOnInit() {
    this.cargando = true;
    const id = this.route.snapshot.paramMap.get('id');

      this.conciertoService.getConcierto( id )
        .subscribe( (resp: ConciertoModel) => {
          this.concierto = resp;
          this.concierto.id = Number(id);
          this.cargando = false;
        });
  }

  eliminarConcierto(concierto: ConciertoModel) {

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Confirma para eliminar ${ concierto.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then( resp => {

      if ( resp.value ) {

        Swal.fire({
          title: 'Espere',
          text: 'Guardando información',
          type: 'info',
          allowOutsideClick: false
        });
        Swal.showLoading();
        
        this.conciertoService.deleteConcierto( concierto.id ).subscribe();
        this.eliminado = true;

        Swal.fire({
          title: `${ concierto.nombre }`,
          text: 'Se eliminó correctamente',
          type: 'success'
        });
      }

    });
  }
}
