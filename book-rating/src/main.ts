import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


///////////////


export class Customer {
  /*private id: number;

  constructor(idx: number) {
    this.id = idx;
  }*/

  // Constructor Shorthand
  constructor(private id: number) {}

  fooBar(arg: number): string {
    setTimeout(() => {
      console.log('Die ID ist', this.id);
    }, 2000);

    return '';
  }
}


const myCustomer = new Customer(5);




const foo = function (arg: number): number {
  return arg + 1;
}

const foo2 = arg => arg + 1;



