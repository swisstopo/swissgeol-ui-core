import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SwissgeolCoreModule } from '@swissgeol/ui-core-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, SwissgeolCoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
