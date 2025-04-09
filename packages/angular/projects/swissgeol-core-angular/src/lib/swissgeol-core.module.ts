import { APP_INITIALIZER, NgModule } from '@angular/core';
import { defineCustomElements } from 'swissgeol-core/loader';
import { DIRECTIVES } from './stencil-generated';

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        console.log('hey')
        defineCustomElements(window)
      },
      multi: true,
    },
  ]
})
export class SwissgeolCoreModule {
  constructor() {
    console.log('Im a module 22')
  }
}
