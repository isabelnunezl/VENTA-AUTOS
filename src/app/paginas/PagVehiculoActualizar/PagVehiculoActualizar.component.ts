import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';

@Component({
  selector: 'app-PagVehiculoActualizar',
  templateUrl: './PagVehiculoActualizar.component.html',
  styleUrls: ['./PagVehiculoActualizar.component.css']
})
export class PagVehiculoActualizarComponent implements OnInit {


  vehiculo?: Vehiculo;
  formulario: FormGroup;
  mostrarErrores: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private vehiculoServicio: VehiculoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      "codigo": [],
      "marca": ['', [Validators.required]],
      "modelo": ['', [Validators.required]],
      "anio": ['', [Validators.required]],
      "kilometraje": ['', [Validators.required]],
      "precio": ['', [Validators.required]],
      "foto": [],
      "calificacion": ['', [Validators.required, Validators.min(0), Validators.max(5)]]
    });
    this.formulario.controls['codigo'].disable();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params =>{
      this.vehiculoServicio.getVehiculo(params['codigo']).subscribe( data =>{
        if(data.codigo == '1'){
          this.vehiculo = data.data;
          this.formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
          this.formulario.controls['marca'].setValue(this.vehiculo?.marca);
          this.formulario.controls['modelo'].setValue(this.vehiculo?.modelo);
          this.formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);
          this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
          this.formulario.controls['anio'].setValue(this.vehiculo?.anio);
          this.formulario.controls['foto'].setValue(this.vehiculo?.foto);
          this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);
        }else{
          Swal.fire({
            title: "Mensaje de Alerta",
            text: "No se pudo cargar la información",
            icon: "error"
          });
        }
      });
    });  
  }

  actualizar() {
    this.mostrarErrores = true;
    if(this.formulario.valid){   
      this.vehiculoServicio.actualizarVehiculo({...this.formulario.value}, this.formulario.controls['codigo'].value).subscribe(data => {
        if(data.codigo == '1'){
          Swal.fire({
            title: "Mensaje",
            text: "Vehículo actualizado con éxito",
            icon: "success"
          }).then(dat =>{
            this.formulario.reset();
            this.router.navigate(['/vehiculos'])
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
}
