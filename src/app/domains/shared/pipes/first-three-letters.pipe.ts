import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstThreeLetters',
  standalone: true
})
export class FirstThreeLettersPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/\s+/g, '').slice(0, 3).toUpperCase();
  }
}