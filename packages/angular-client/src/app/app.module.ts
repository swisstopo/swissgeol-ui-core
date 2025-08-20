import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {
  SgcButton,
  SgcIcon,
  SgcMenuItem,
  SgcTranslate,
} from '@swissgeol/ui-core-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SgcTranslate,
    SgcButton,
    SgcIcon,
    SgcMenuItem,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
