import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ConciertosComponent } from './shared/components/conciertos/conciertos.component';
import { ConciertoTarjetaComponent } from './shared/components/concierto-tarjeta/concierto-tarjeta.component';

import { TimestampToDatePipe } from './shared/pipes/TimestampToDatePipe/timestamp-to-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ConciertosComponent,
    ConciertoTarjetaComponent,
    TimestampToDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
