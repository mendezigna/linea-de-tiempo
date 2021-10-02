import { TimelineModel } from './../../utils/timeline';
import { CategoryService } from './../category.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../../ui/material.module';

import { CategoryPageComponent } from './category-page.component';
import { of } from 'rxjs';

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;
  let categoryService : CategoryService;
  let router : Router;
  let activeRoute : ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPageComponent ],
      providers: [
        CategoryService,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        CommonModule,
        MaterialModule,
        HttpClientModule,
        SharedModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        TranslateTestingModule.withTranslations({})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    activeRoute = TestBed.inject(ActivatedRoute)
    categoryService = TestBed.inject(CategoryService)
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be empty', () => {
    expect(component.timelines).toEqual([])
  });
  it('should have category', () => {
    const spyRoute = spyOn(activeRoute.snapshot.paramMap, 'get')
    spyRoute.and.returnValue('HISTORY')
    fixture = TestBed.createComponent(CategoryPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    expect(component.category).toBe('HISTORY')
  })
  it('should have timeline', () => {
    const timeline = {title: 'Time line', id: 'abcde12345'}
    const spyRoute = spyOn(activeRoute.snapshot.paramMap, 'get')
    spyRoute.and.returnValue('HISTORY')
    const spyService = spyOn(categoryService, 'getWithCategory')
    spyService.and.returnValue(of([timeline]))
    fixture = TestBed.createComponent(CategoryPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    expect(component.timelines).toContain(timeline)
  })
});
