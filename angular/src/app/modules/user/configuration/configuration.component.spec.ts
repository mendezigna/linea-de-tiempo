import { ThemeService } from './../../ui/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationComponent } from './configuration.component';
import { SharedModule } from 'src/app/shared-module';
import { ThemeModule } from '../../ui/theme.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;
  let themeService : ThemeService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationComponent],
      imports: [TranslateTestingModule.withTranslations({}),
        SharedModule,
        ThemeModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        MatOptionModule,
        MatRadioModule,
        MatInputModule,
        
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    themeService = TestBed.inject(ThemeService)
    localStorage.setItem('theme', 'lightTheme')
    localStorage.setItem('language', 'english')
    fixture = TestBed.createComponent(ConfigurationComponent);
    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have language', () => {
    expect(component.selectedLanguage).toBe('english')
  });

  it('should have theme', () => {
    expect(component.selectedTheme).toBe('lightTheme')
  })

  it('should change theme', () => {
    component.changeTheme('darkTheme')
    expect(localStorage.getItem('theme')).toBe('darkTheme')
  })

  it('should change language', () => {
    component.changeLanguage('spanish')
    expect(localStorage.getItem('language')).toBe('spanish')
  })
});
