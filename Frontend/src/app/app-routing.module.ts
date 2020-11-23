import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnimalComponent} from './animal/animal.component'
import {TipoComponent} from './tipo/tipo.component'

const routes: Routes = [
  {
    path: '',
    component: AnimalComponent
  },
  {
    path: 'tipos',
    component: TipoComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
