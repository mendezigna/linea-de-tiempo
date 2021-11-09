import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../ui/material.module';
import { DragScrollModule } from 'ngx-drag-scroll';
import { HomeService } from './home.service';
import { TimelineModel } from '../utils/timeline';
import { of } from 'rxjs';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let homeService: HomeService;
  const timeline: TimelineModel = new TimelineModel()
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [
        RouterTestingModule,
        CommonModule,
        MaterialModule,
        HttpClientModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatIconModule,
        DragScrollModule,
        TranslateTestingModule.withTranslations({})
      ],
      providers: [HomeService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    homeService = TestBed.inject(HomeService)
    const spyService = spyOn(homeService, 'getExamples')
    spyService.and.callFake(() => of([timeline]))
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have examples', async () => {
    expect(component.timelines).toContain(timeline)
  })
});
