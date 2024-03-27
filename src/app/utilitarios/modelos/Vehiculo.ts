export interface Vehiculo{
    codigo: string; 
    marca: string; 
    modelo?: string;
    anio?: number; 
    kilometraje?: string;
    precio?: number;
    foto?: string | null; 
    calificacion?: number;
  }