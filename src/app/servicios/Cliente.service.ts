import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../utilitarios/modelos/Cliente';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { 
  }

  baseUrl = "https://www.epico.gob.ec/vehiculo/public/api/"; 

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}) 
  };

  insertCliente(cliente: Cliente){
    return this.http.post<Respuesta>(this.baseUrl + "cliente/", cliente, this.httpOptions);
  }
}

export interface Respuesta{
  codigo:string;
  mensaje:string;
  data:Array<Cliente>|Cliente|any;
  rows:number;
  pages:number;
  records:number;
  page:number;
}
