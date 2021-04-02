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

  getConciertos() {
    return this.http.get(`${ this.url }`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  getConcierto( id: string ) {
    return this.http.get(`${ this.url }/${ id }`);
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
