import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';

@Component({
  selector: 'app-PagListaVehiculos',
  templateUrl: './PagListaVehiculos.component.html',
  styleUrls: ['./PagListaVehiculos.component.css']
})
export class PagListaVehiculosComponent implements OnInit {

  mostrarImagen: boolean = false;
  formulario: FormGroup;

  constructor(
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      "codigo": [],
      "marca": ['', [Validators.required]],
      "modelo": ['', [Validators.required]],
      "anio": ['', [Validators.required]],
      "kilometraje": ['', [Validators.required]],
      "precio": ['', [Validators.required]],
      "foto": [],
      "calificacion": []
    });

   }

  
  public listaVehiculos:Array<Vehiculo> = [];  
  //private _filtro: string = "";
  public rows:number = 10;
  public page:number = 1;
  public pages:number = 0;
  public filtro:string = "";


  /*get filtro(): string{
    return this._filtro;
  }

  set filtro(filtro: string){
    this._filtro = filtro;
    //this.consultaVehiculos();
  }*/

  //@Input() valor:string = '';

  ngOnInit() {
    this.consultarVehiculos();
    //this.listaVehiculos = this.vehiculoService.getVehiculos();
  }

  mostrar() {
    this.mostrarImagen = !this.mostrarImagen;
  }

  consultarVehiculos(){
    this.vehiculoService.getVehiculos(this.filtro, this.rows, this.page).subscribe(respuesta => {
      if(respuesta.codigo == '1'){
        this.listaVehiculos = respuesta.data;
        this.pages = respuesta.pages;
        this.paginar(respuesta.pages);
      }  
    });
  }

  cambiarPagina(pagina:number){
    this.page = pagina;
    this.consultarVehiculos();
  }

  listaPaginas:Array<number> = [];
  paginar(pages:number ){
    this.listaPaginas = [];
    for(let i=1; i<=pages; i++){
      this.listaPaginas.push(i);
    }
  }

  siguiente(){
    if(this.page < this.pages){
      this.page++;
      this.consultarVehiculos();
    }
  }

  atras(){
    if(this.page > 1){
      this.page--;
      this.consultarVehiculos();
    }
  }

  /*recepcion(dato:number){
    console.log('Dato:',dato)
  }*/

  /*editar(codigo:string){
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
  }*/


  eliminar(codigo:string){
    Swal.fire({
      title: "¿Estás seguro que deseas eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      icon: "question"
    }).then( (res) =>{
      if(res.isConfirmed){
        this.vehiculoService.eliminarVehiculo(codigo).subscribe( data =>{
          if(data.codigo == '1'){
            this.consultarVehiculos();
            Swal.fire({
              title: "Mensaje",
              text: "Vehículo eliminado con éxito",
              icon: "success"
            });
          }else{
            Swal.fire({
              title: "Mensaje",
              text: "No se pudo eliminar el registro:" + data.mensaje,
              icon: "error"
            });
          }
        });
      }
    });
  }

}
