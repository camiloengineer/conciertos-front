import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ConciertosService } from '../../../core/services/conciertos.service';
import { ConciertoModel } from '../../../core/models/concierto.model';
import Swal from 'sweetalert2';

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
    private router: Router,
    private conciertoService: ConciertosService
  ) { };

  ngOnInit() {
    //Carga el detalle del concierto y permite eliminar o redirigir a la edición
    try {
      this.cargando = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');

      this.conciertoService.getConcierto(id)
        .subscribe((resp: ConciertoModel) => {
          this.concierto = resp;
          this.concierto.id = Number(id);
          this.cargando = false;
        });
    }
    catch {
      this.router.navigate(['/home'])
    }
  }

  eliminarConcierto(concierto: ConciertoModel) {
    //Elimina la data del concierto, solicitando confirmación
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `Confirma para eliminar ${concierto.nombre}`,
        type: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(resp => {

        if (resp.value) {

          Swal.fire({
            title: 'Espere',
            text: 'Guardando información',
            type: 'info',
            allowOutsideClick: false
          });
          Swal.showLoading();

          this.conciertoService.deleteConcierto(concierto.id).subscribe();
          this.eliminado = true;

          Swal.fire({
            title: `${concierto.nombre}`,
            text: 'Se eliminó correctamente',
            type: 'success'
          });
        }

      });
    }
    catch {
      this.router.navigate(['/home'])
    }
  }
}