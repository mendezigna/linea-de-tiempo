import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './modules/ui/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Linea de tiempo';

  constructor(private translateService: TranslateService, private themeService : ThemeService) {
  } 
  ngOnInit(): void {
    const language = localStorage.getItem('language')
    const theme = localStorage.getItem('theme')
    if(language && language != this.translateService.currentLang) {
      this.translateService.use(language).subscribe()
    } else {
      this.translateService.use(this.translateService.getBrowserLang()).subscribe()
    }
    if(theme){
      this.themeService.setActiveThem(theme)
    }
  }

  
}