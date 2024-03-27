import { Injectable } from '@angular/core';
import { Vehiculo } from '../utilitarios/modelos/Vehiculo';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { 
  }

  baseUrl = "https://epico.gob.ec/vehiculo/public/api/"; 

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}) 
  };


  getVehiculos(filtro?:string, rows?:number, page?:number):Observable<Respuesta> {
    let body = new HttpParams();
    body = filtro ? body.set('filtro',filtro) : body;
    body = rows ? body.set('rows',rows) : body;
    body = page ? body.set('page',page) : body;
    /*return this.http.get<Respuesta>(this.baseUrl + "vehiculos/", {params: body}).pipe(
      map(respuesta => respuesta.data)
    );*/
    return this.http.get<Respuesta>(this.baseUrl+"vehiculos/", {params: body});

  }

  insertVehiculo(vehiculo: Vehiculo){
    return this.http.post<Respuesta>(this.baseUrl + "vehiculo/", vehiculo, this.httpOptions);
  }

  getVehiculo(codigo:string){
    return this.http.get<Respuesta>(this.baseUrl + "vehiculo/"+codigo)
  }

  actualizarVehiculo(vehiculo: Vehiculo, codigo:string){
    return this.http.put<Respuesta>(this.baseUrl + "vehiculo/"+codigo, vehiculo, this.httpOptions)
  }

  eliminarVehiculo(codigo:string){
    return this.http.delete<Respuesta>(this.baseUrl + "vehiculo/"+codigo)
  }

  /*getVehiculos(filtro:any):Observable<Array<Vehiculo>>{
    const escucha: Observable<Array<Vehiculo>> = new Observable(escuchando => {
      let lista = this.listaVehiculos.filter(elem => elem.marca.toLowerCase().includes(filtro.toLowerCase()));
      escuchando.next(lista);
    })
    return escucha;
  }*/

  /*getVehiculo(codigo:string): Observable<Vehiculo>{
    const escucha: Observable<Vehiculo> = new Observable(escuchando => {
      let vehiculo = this.listaVehiculos.find(ele => ele.codigo === codigo);
      escuchando.next(vehiculo);
    })
    return escucha;
  }*/

  addVehiculo(vehiculo: Vehiculo){
    //vehiculo.codigo = 'A00' + (this.contadorCarros + 1); 
    this.listaVehiculos.push(vehiculo);
    //this.contadorCarros = this.listaVehiculos.length; 
  }

  private listaVehiculos: Array<Vehiculo> =  [
    {
      "codigo": "A001",
      "marca": "Chevrolet",
      "modelo": "Joy",
      "kilometraje": "650",
      "precio": 16299,
      "foto": "https://www.chevrolet.com.ec/bypass/gmccontenthub/chevrolet/gm-ec/colorizer_joy_hb/images/colorizer/joy-hb-rojo-3-4F.png",
      "anio": 2020,
      "calificacion": 3
    },
    {
      "codigo": "A002",
      "marca": "Honda",
      "modelo": "Accord Hybrid",
      "kilometraje": "1300",
      "precio": 24999,
      "foto": "https://www.justdrive.fo/app/web/upload/medium/800x500-2718-1663064449.png",
      "anio": 2017,
      "calificacion": 4
    },
    {
      "codigo": "A003",
      "marca": "BMW",
      "modelo": "X4 F26 20d",
      "kilometraje": "0",
      "precio": 15000,
      "foto": "https://juratuning.pl/wp-content/uploads/2018/11/bmw-x4.png",
      "anio": 2018,
      "calificacion": 3
    },
    {
      "codigo": "A004",
      "marca": "Lamborghini",
      "modelo": "Huracán Performante",
      "kilometraje": "16000",
      "precio": 274390,
      "foto": "https://pluspng.com/img-png/car-png-lamborghini-624.png",
      "anio": 2016,
      "calificacion": 3
    },
    {
      "codigo": "A005",
      "marca": "Audi",
      "modelo": "A3 Sedan",
      "kilometraje": "20500",
      "precio": 52780,
      "foto": "https://avatars.mds.yandex.net/get-altay/903559/2a000001886d375fcf462e1ff55011da5847/L_height",
      "anio": 2019,
      "calificacion": 5
    }
  ];

}

export interface Respuesta{
  codigo:string;
  mensaje:string;
  data:Array<Vehiculo>|Vehiculo|any;
  rows:number;
  pages:number;
  records:number;
  page:number;
}
