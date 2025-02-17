import { TinacoAgua } from "../entities/Tinaco";


export class ObtenerNivelAgua{
  execute(): TinacoAgua {
    // Simulando una consulta de nivel de agua
    return new TinacoAgua('Medio');
  }
}
