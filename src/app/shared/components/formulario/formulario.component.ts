import { ConciertosService } from '../../../core/services/conciertos.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ConciertoModel } from '../../../core/models/concierto.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.sass']
})

export class FormularioComponent implements OnInit {

  conciertoForm: FormGroup;
  concierto: ConciertoModel;
  success: boolean = false;
  disableSelect = new FormControl(false);
  artistas = new FormArray([]);
  artistasList: string[] = []
  public agotado: boolean = false;

  constructor(
    private conciertosService: ConciertosService,
    private activatedRoute: ActivatedRoute
  ) {
    this.conciertoForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.artistas.push(new FormControl(''));
  }

  createFormGroup() {
    const formatUrl = '^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png|jpeg)$';
    return new FormGroup({
      textNombre: new FormControl("", [Validators.required, Validators.minLength(5)]),
      textImagen: new FormControl("", [Validators.required, Validators.pattern(formatUrl)]),
      textFecha: new FormControl("", [Validators.required]),
      selectedRecinto: new FormControl("", [Validators.required]),
      selectedComuna: new FormControl("", [Validators.required]),
      textPrecio: new FormControl("", [Validators.required, Validators.min(1000)]),
      monedaRadio: new FormControl("CLP", [Validators.required]),
      artistas: new FormArray([
        new FormGroup({
          textNombreArtista: new FormControl(''),
        })
      ])
    })
  }

  async onSaveForm() {

    if (this.conciertoForm.valid) {

      Swal.fire({
        title: 'Espere',
        text: 'Se está guardando la información',
        type: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();

      this.activatedRoute.params.subscribe( params => {

        let concierto: ConciertoModel = {
        id: 0,
        nombre : this.conciertoForm.controls.textNombre.value,
        imagen : this.conciertoForm.controls.textImagen.value,
        fecha : new Date(this.conciertoForm.controls.textFecha.value).getTime() / 1000,
        recinto : this.conciertoForm.controls.selectedRecinto.value,
        comuna : this.conciertoForm.controls.selectedRecinto.value,
        precio : {
          moneda: this.conciertoForm.controls.monedaRadio.value,
          monto: this.conciertoForm.controls.textPrecio.value
        },
        artistas : this.artistas.value,
        agotado : this.agotado
        }   

        debugger;
        this.conciertosService.crearConcierto(concierto)
        .subscribe(data => {
          console.log(data)
          Swal.fire({
            title: `${ concierto.nombre }`,
            text: 'Se guardó correctamente',
            type: 'success'
          });
          this.success = true;
        },
        error => {
          console.log(error)
        });
      });
    }
  }

  addArtista(prevValue: string) {
    if (prevValue) { 
      this.artistas.push(new FormControl(''))
    };
  }

  removeArtista(index: number) {
    this.artistas.removeAt(index);
  }

}
