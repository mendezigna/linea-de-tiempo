import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { ErrorPageComponent } from './modules/error-page/error-page.component';
import { HeaderComponent } from './modules/header/header.component';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateTestingModule, } from 'ngx-translate-testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({}),
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatIconModule,
      ],
      declarations: [
        HeaderComponent,
        ErrorPageComponent,
        HomePageComponent,
        AppComponent,
      ],
      providers: []
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Linea de tiempo');
  });

});
