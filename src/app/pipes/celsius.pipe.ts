import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsius'
})
export class CelsiusPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return Math.round((+value - 32) * 5/9);
  }

}
