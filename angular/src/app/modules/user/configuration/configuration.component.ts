import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './../../ui/theme.service';
import { User } from './../../utils/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  selectedLanguage : string = localStorage.getItem('language') || 'english'
  selectedTheme : string = localStorage.getItem('theme') || 'lightTheme'

  constructor(private themeService : ThemeService, private translateService : TranslateService){}

  ngOnInit(): void {
  }

  changeTheme(theme : string){
    this.themeService.setActiveThem(theme)
  }
  
  changeLanguage(language : string){
    this.translateService.use(language)
    localStorage.setItem('language', language)
  }

}
