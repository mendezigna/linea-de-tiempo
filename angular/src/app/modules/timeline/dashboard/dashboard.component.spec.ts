import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TimelineService } from '../timeline.service';
import { DragScrollModule } from 'ngx-drag-scroll';

import { DashboardComponent } from './dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        HttpClientModule,
        TranslateTestingModule.withTranslations({}),
        MatSnackBarModule,
        RouterTestingModule,
        MatCardModule,
        DragScrollModule,
        MatDialogModule
      ],
      providers: [TimelineService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
