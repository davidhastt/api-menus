export interface Construccion {
    id_construccion?: number;
    id_persona: number;
    tema: number;
    subtema: number;
    concepto: number;    
    nombre: string,
    años: string[]
    direcciones: string[],
    coordinates: [number, number],
}