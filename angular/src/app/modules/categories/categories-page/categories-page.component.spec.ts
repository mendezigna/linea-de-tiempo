import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../../ui/material.module';
import { CategoryService } from '../category.service';

import { CategoriesPageComponent } from './categories-page.component';

describe('CategoryPageComponent', () => {
  let component: CategoriesPageComponent;
  let fixture: ComponentFixture<CategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesPageComponent ],
      providers: [CategoryService],
      imports: [
        RouterTestingModule,
        CommonModule,
        TranslateTestingModule.withTranslations({}),
        MaterialModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPageComponent);
    TestBed.inject(CategoryService)
    TestBed.inject(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
