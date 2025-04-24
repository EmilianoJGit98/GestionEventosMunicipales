import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodebase64',
  standalone: true,
})
export class Decodebase64Pipe implements PipeTransform {
  transform(imagenBase64: string | undefined, tipo: string = 'png'): string {
    // Retorna una cadena vacía si la imagen es indefinida
    if (!imagenBase64) {
      return ''; // O puedes retornar una URL por defecto
    }
    if (!imagenBase64.startsWith('data:image/')) {
      return `data:image/${tipo};base64,${imagenBase64}`;
    }
    return imagenBase64;
  }
}
