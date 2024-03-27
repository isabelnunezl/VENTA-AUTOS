import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-PagVehiculoRegistro',
  templateUrl: './PagVehiculoRegistro.component.html',
  styleUrls: ['./PagVehiculoRegistro.component.css']
})


export class PagVehiculoRegistroComponent implements OnInit {

  vehiculo?: Vehiculo;
  formulario: FormGroup;
  mostrarErrores: boolean = false;
  
  constructor(
    private vehiculoServicio: VehiculoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      "codigo":  ['', [Validators.required]],
      "marca": ['', [Validators.required]],
      "modelo": ['', [Validators.required]],
      "anio": ['', [Validators.required]],
      "kilometraje": ['', [Validators.required]],
      "precio": ['', [Validators.required]],
      "foto": [],
      "calificacion": ['', [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

  ngOnInit() {
  }

  guardar() {
    this.mostrarErrores = true;
    if (this.formulario.valid) {
      this.vehiculoServicio.insertVehiculo({...this.formulario.value}).subscribe(
        respuesta =>{
          console.log("Vehiculo:",respuesta);
          if(respuesta.codigo == '1'){
            Swal.fire({
              title: "Mensaje",
              text: "Vehículo registrado con éxito",
              icon: "success"
            }).then(res =>{
              this.formulario.reset();
              this.router.navigate(['/vehiculos'])
            });
          }else{
            Swal.fire({
              title: "Mensaje",
              text: "No se pudo registrar el vehículo"+respuesta.mensaje,
              icon: "error"
            });
          }
        }
      );
    }else{
      Swal.fire({
        title: "Mensaje",
        text: "Faltan llenar campos",
        icon: "error"
      });
    }
  }
}
