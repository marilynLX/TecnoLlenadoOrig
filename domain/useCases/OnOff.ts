export class BombaAgua{
    execute(state: boolean): string {
      return state ? 'Bomba Encendida' : 'Bomba Apagada';
    }
  }