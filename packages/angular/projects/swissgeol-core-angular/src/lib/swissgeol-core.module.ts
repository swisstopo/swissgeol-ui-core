import { NgModule, provideAppInitializer } from '@angular/core';
import { defineCustomElements } from 'swissgeol-core/loader';
import { DIRECTIVES } from './stencil-generated';

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  providers: [provideAppInitializer(() => defineCustomElements())],
})
export class SwissgeolCoreModule {}
