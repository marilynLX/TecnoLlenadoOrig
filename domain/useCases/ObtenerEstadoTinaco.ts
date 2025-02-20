import { TinacoAgua } from "../entities/Tinaco";


export class ObtenerNivelAgua{
  execute(): TinacoAgua {
    // por ahora se simula una consulta
    return new TinacoAgua('Medio');
  }
}
