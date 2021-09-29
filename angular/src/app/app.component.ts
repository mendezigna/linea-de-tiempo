import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './modules/ui/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Linea de tiempo';

  constructor(private translate: TranslateService) {
    this.translate.use(this.translate.getBrowserLang())
  } 
}