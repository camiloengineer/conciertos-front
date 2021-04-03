import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { BuscadorComponent } from './shared/components/buscador/buscador.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { EditarComponent } from './pages/editar/editar.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, //Página inicial
  { path: 'detail/:id', component: DetailComponent }, //Detalle de concierto
  { path: 'buscar/:termino', component: BuscadorComponent }, //Búsqueda de artistas ingresada desde el navbar
  { path: 'agregar', component: AgregarComponent }, //Creación de un nuevo concierto
  { path: 'editar/:id', component: EditarComponent }, //Edición de un concierto existente
  { path: '**', pathMatch: 'full', redirectTo: 'home' } 
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
