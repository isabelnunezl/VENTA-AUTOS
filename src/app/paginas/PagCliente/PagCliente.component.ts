import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../utilitarios/modelos/Cliente';
import Swal from 'sweetalert2';
import { ClienteService } from '../../servicios/Cliente.service';

@Component({
  selector: 'app-PagCliente',
  templateUrl: './PagCliente.component.html',
  styleUrls: ['./PagCliente.component.css']
})
export class PagClienteComponent implements OnInit {


  cliente?: Cliente;
  formulario: FormGroup; 

  quiereContacto: boolean = false;
  mostrarErrores: boolean = false;

  constructor(
    private clienteServicio: ClienteService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      "nombre": ['', [Validators.required]],
      "apellido": ['', [Validators.required]],
      "password": [],
      "telefono": [],
      "email": [],
      "foto": [],
      "quiereContacto": [false] // inicialización correcta
    });
    
    this.formulario.get('quiereContacto')?.valueChanges.subscribe((value) => {
      if (value !== null && value !== undefined) {
        this.quiereContacto = value;
      }
    });
    
  }

  ngOnInit() {
  }

  registra() {
    this.mostrarErrores = true;
    if (this.formulario.valid) {
      this.clienteServicio.insertCliente({...this.formulario.value}).subscribe(
        respuesta =>{
          console.log("Cliente:",respuesta);
          if(respuesta.codigo == '1'){
            Swal.fire({
              title: "Mensaje",
              text: "Cliente registrado con éxito",
              icon: "success"
            }).then(res =>{
              this.formulario.reset();
              this.router.navigate(['/vehiculos'])
            });
          }else{
            Swal.fire({
              title: "Mensaje",
              text: "No se pudo registrar el cliente"+respuesta.mensaje,
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
