import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anyCast'
})
export class AnyCastPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value;
  }

}


// @Pipe({
//   name: 'anyCast',
//   pure: true
// })
// export class CastPipe implements PipeTransform {

//   constructor() {
//   }

//   transform(value: any, args?: any): CscEvent {
//     return value;
//   }
// }
