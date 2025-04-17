import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CoreComponentsAngularModule } from 'core-components-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), CoreComponentsAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
