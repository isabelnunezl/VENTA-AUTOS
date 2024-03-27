import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/Home/Home.component';
import { PagListaVehiculosComponent } from './paginas/PagListaVehiculos/PagListaVehiculos.component';
import { PagNotFoundComponent } from './paginas/PagNotFound/PagNotFound.component';
import { PagVehiculoComponent } from './paginas/PagVehiculo/PagVehiculo.component';
import { PagVehiculoRegistroComponent } from './paginas/PagVehiculoRegistro/PagVehiculoRegistro.component';
import { PagClienteComponent } from './paginas/PagCliente/PagCliente.component';
import { PagVehiculoActualizarComponent } from './paginas/PagVehiculoActualizar/PagVehiculoActualizar.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "vehiculos",
    component: PagListaVehiculosComponent,
  },
  {
    path: "vehiculo/:codigo",
    component: PagVehiculoComponent
  },
  {
    path: "vehiculo",
    component: PagVehiculoRegistroComponent
  },
  {
    path: "vehiculos/:codigo",
    component: PagVehiculoActualizarComponent
  },
  {
    path: "cliente",
    component: PagClienteComponent
  },
  {
    path: "",
    component: PagListaVehiculosComponent,
    pathMatch: "full"
  },
  {
    path: "**",
    component: PagNotFoundComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
