export type EstadoTinaco = 'Vacio' | 'Medio' | 'Lleno';

export class TinacoAgua {
  constructor(public nivel: EstadoTinaco) {}

  isVacio() {
    return this.nivel === 'Vacio';
  }
  isMedio() {
    return this.nivel === 'Medio';
  }
  isLleno() {
    return this.nivel === 'Lleno';
  }
}
