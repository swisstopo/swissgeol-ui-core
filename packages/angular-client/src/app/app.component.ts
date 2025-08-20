import { Component, OnInit } from '@angular/core';
import { Language, SwissgeolCoreI18n } from '@swissgeol/ui-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent implements OnInit {
  counter = 5;

  ngOnInit() {
    const interval = setInterval(() => {
      if (this.counter === 1) {
        SwissgeolCoreI18n.setLanguage(Language.French);
        clearInterval(interval);
      }
      this.counter -= 1;
    }, 1000);
  }

  onItemClick(event: Event) {
    console.log('Angular - Menu item clicked:', event);
  }
}
