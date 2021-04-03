import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ConciertosComponent } from './shared/components/conciertos/conciertos.component';
import { ConciertoTarjetaComponent } from './shared/components/concierto-tarjeta/concierto-tarjeta.component';

import { TimestampToDatePipe } from './shared/pipes/TimestampToDatePipe/timestamp-to-date.pipe';
import { DetailComponent } from './pages/detail/detail.component';
import { ConciertoComponent } from './shared/components/concierto/concierto.component';
import { ReemplazarSignoPipe } from './shared/pipes/ReemplazarSigno/reemplazar-signo.pipe';
import { BuscadorComponent } from './shared/components/buscador/buscador.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { FormularioComponent } from './shared/components/formulario/formulario.component';
import { EditarComponent } from './pages/editar/editar.component';
import { RegExpDirective } from './shared/directives/reg-exp.directive';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ConciertosComponent,
    ConciertoTarjetaComponent,
    TimestampToDatePipe,
    DetailComponent,
    ConciertoComponent,
    ReemplazarSignoPipe,
    BuscadorComponent,
    AgregarComponent,
    FormularioComponent,
    EditarComponent,
    RegExpDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
