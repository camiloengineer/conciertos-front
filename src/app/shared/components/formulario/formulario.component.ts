import { ConciertosService } from '../../../core/services/conciertos.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray
} from "@angular/forms";
import { ActivatedRoute, Router, } from "@angular/router";
import { ConciertoModel } from '../../../core/models/concierto.model';
import { formatDateHour } from './../../utils/utils'

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

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
  agotado: boolean = false;
  cargando: boolean = false;
  idEditar: string = '';
  textEncabezado: string = '';

  constructor(
    private conciertosService: ConciertosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.conciertoForm = this.createFormGroup();
  }

  ngOnInit(): void {
    Promise.resolve(this.getData());
  }

  createFormGroup() {
    //Inicializa variables del formulario 
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

  async getData() {
    //Carga la data de los formularios de editar y crear según si trae id de edición
    try {
      this.cargando = true;
      this.idEditar = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.idEditar)
      if (this.idEditar) {
        this.textEncabezado = "Editar concierto"
        this.conciertosService.getConcierto(this.idEditar)
          .subscribe((resp: ConciertoModel) => {
            this.concierto = resp;
            this.conciertoForm.get('textNombre').setValue(this.concierto.nombre);
            this.conciertoForm.get('textImagen').setValue(this.concierto.imagen);

            let fecha = formatDateHour(this.concierto.fecha);
            console.log(fecha)
            this.conciertoForm.get('textFecha').setValue(fecha);

            this.conciertoForm.get('selectedRecinto').setValue(this.concierto.recinto);
            this.conciertoForm.get('selectedComuna').setValue(this.concierto.comuna);

            this.conciertoForm.get('textPrecio').setValue(this.concierto.precio.monto);
            this.conciertoForm.get('monedaRadio').setValue(this.concierto.precio.moneda);

            this.conciertoForm.get('textImagen').setValue(this.concierto.imagen);

            this.concierto.artistas.forEach(element => {
              console.log(element)
              this.artistas.push(new FormControl(element))
            });

            this.agotado = this.concierto.agotado;
            this.cargando = false;
          });
      }
      else {
        this.textEncabezado = "Crear concierto"
        this.artistas.push(new FormControl(''));
        this.cargando = false;
      }
    }
    catch {
      this.router.navigate(['/home', this.concierto.id]);
    }
  }


  async onSaveForm() {
    //Al hacer submit valida si hay un id asociado para editar, si no existe se crea un nuevo registro
    if (this.conciertoForm.valid) {

      try {

        Swal.fire({
          title: 'Espere',
          text: 'Se está guardando la información',
          type: 'info',
          allowOutsideClick: false
        });
        Swal.showLoading();

        let concierto: ConciertoModel = {
          id: 0,
          nombre: this.conciertoForm.controls.textNombre.value,
          imagen: this.conciertoForm.controls.textImagen.value,
          fecha: new Date(this.conciertoForm.controls.textFecha.value).getTime() / 1000,
          recinto: this.conciertoForm.controls.selectedRecinto.value,
          comuna: this.conciertoForm.controls.selectedComuna.value,
          precio: {
            moneda: this.conciertoForm.controls.monedaRadio.value,
            monto: this.conciertoForm.controls.textPrecio.value
          },
          artistas: this.artistas.value,
          agotado: this.agotado
        }

        let peticion: Observable<any>;

        if (this.idEditar) {
          peticion = this.conciertosService.actualizarConcierto(Number(this.idEditar), concierto);
        } else {
          peticion = this.conciertosService.crearConcierto(concierto);
        }

        peticion.subscribe(data => {
          Swal.fire({
            title: `${concierto.nombre}`,
            text: 'Se guardó correctamente',
            type: 'success'
          });
          this.success = true;
        });
      }
      catch {
        //Implementar logger de posibles errores que surjan
        this.router.navigate(['/home', this.concierto.id]);
      }
    }
  }

  //Ícono para agregar artistas asociados a un concierto
  addArtista(prevValue: string) {
    if (prevValue) {
      this.artistas.push(new FormControl(''))
    };
  }
  //Ícono para eliminar artistas asociados a un concierto
  removeArtista(index: number) {
    this.artistas.removeAt(index);
  }
}
