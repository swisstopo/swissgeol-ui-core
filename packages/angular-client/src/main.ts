import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Language, SwissgeolCoreI18n } from '@swissgeol/ui-core';

SwissgeolCoreI18n.setLanguage(Language.German);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
