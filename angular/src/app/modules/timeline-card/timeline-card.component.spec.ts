import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../ui/material.module';

import { TimelineCardComponent } from './timeline-card.component';

describe('TimelineCardComponent', () => {
  let component: TimelineCardComponent;
  let fixture: ComponentFixture<TimelineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineCardComponent ],
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({}),
        CommonModule,

        MaterialModule,
        SharedModule,
        NgbModule,
        MatCardModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
