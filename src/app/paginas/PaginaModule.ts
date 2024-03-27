import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UtilitariosModule } from "../utilitarios/UtilitariosModule";
import { RouterModule } from "@angular/router";
import { PagListaVehiculosComponent } from "./PagListaVehiculos/PagListaVehiculos.component";

import { PagVehiculoRegistroComponent } from "./PagVehiculoRegistro/PagVehiculoRegistro.component";
import { HomeComponent } from "./Home/Home.component";
import { PagVehiculoComponent } from "./PagVehiculo/PagVehiculo.component";
import { PagClienteComponent } from "./PagCliente/PagCliente.component";
import { PagVehiculoActualizarComponent } from "./PagVehiculoActualizar/PagVehiculoActualizar.component";


@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        UtilitariosModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations:[
        PagListaVehiculosComponent,
        PagVehiculoComponent,
        PagVehiculoRegistroComponent,
        PagVehiculoActualizarComponent,
        PagClienteComponent,
        HomeComponent
    ],
    exports:[
        PagListaVehiculosComponent,
        PagVehiculoComponent,
        PagVehiculoRegistroComponent,
        PagVehiculoActualizarComponent,
        PagClienteComponent,
        HomeComponent
    ]
})

export class PaginaModule{

}