import { ConciertoModel } from '../models/concierto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConciertosService {

  private url: string =  environment.urlDBFirebase;

  constructor( private http: HttpClient ) { }

  //Obtiene listado de conciertos
  getConciertos() {
    return this.http.get(`${ this.url }`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  //Obtiene un solo concierto por identificador
  getConcierto( id: string ) {
    return this.http.get(`${ this.url }/${ id }`);
  }

  //Elimina concierto por identificador
  deleteConcierto(id: number): any {
    return this.http.delete(`${ this.url }/${ id }`);
  }

  //Crea concierto, el identificador es es autogenerado internamente
  crearConcierto( concierto: ConciertoModel ) {

    return this.http.post(`${ this.url }`, concierto)
            .pipe(
              map( (resp: any) => {
                concierto.id = resp.name;
                return concierto;
              })
            );

  }

  //Actualiza un concierto por identificador
  actualizarConcierto( id: number, concierto: ConciertoModel ) {

    const heroeTemp = {
      ...concierto
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/${ id }`, concierto);
  }

  private crearArreglo( conciertosObj: object ) {

    const conciertos: ConciertoModel[] = [];

    Object.keys( conciertosObj ).forEach( key => {

      const concierto: ConciertoModel = conciertosObj[key];
      conciertos.push( concierto );
    });


    return conciertos;

  }
}
