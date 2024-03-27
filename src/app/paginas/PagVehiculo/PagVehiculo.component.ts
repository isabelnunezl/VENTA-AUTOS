import { Component, OnInit } from '@angular/core';

import { VehiculoService } from '../../servicios/Vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';


@Component({
  selector: 'app-PagVehiculo',
  templateUrl: './PagVehiculo.component.html',
  styleUrls: ['./PagVehiculo.component.css']
})
export class PagVehiculoComponent implements OnInit {
  
  vehiculo?: Vehiculo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe( params =>{
      this.vehiculoService.getVehiculo(params['codigo']).subscribe( data =>{
        this.vehiculo = data.data;
      });
    }); 
  }

  onBack(){
    this.router.navigate(['/vehiculos'])
  }

  /*guardar(){
    if(this.formulario.valid){   
      this.vehiculoService.actualizarVehiculo({...this.formulario.value}, this.formulario.controls['codigo'].value).subscribe(data => {
        if(data.codigo == '1'){
          Swal.fire({
            title: "Mensaje",
            text: "Vehículo actualizado con éxito",
            icon: "info"
          });
        }
      })
    }else{
      Swal.fire({
        title: "Mensaje",
        text: "Faltan llenar campos",
        icon: "error"
      });
    }
  }
  imprimir(){
    console.log('Formulario: ',this.formulario)
  }*/



}
