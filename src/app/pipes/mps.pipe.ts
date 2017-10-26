import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mps'
})
export class MpsPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return Math.round(value*0.44704);
  }

}
