export type EstadoTinaco = 'Vacio' | 'Medio' | 'Lleno';

export class TinacoAgua {
  constructor(public nivel: EstadoTinaco) {}

  isVacio() {
    return this.nivel === 'Vacio';
  }

  isLleno() {
    return this.nivel === 'Lleno';
  }
}
