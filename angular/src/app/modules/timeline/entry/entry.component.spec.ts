import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared-module';
import { MaterialModule } from '../../ui/material.module';
import { TimelineService } from '../timeline.service';

import { EntryComponent } from './entry.component';

describe('EntryComponent', () => {
  let component: EntryComponent;
  let fixture: ComponentFixture<EntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryComponent],
      providers: [TimelineService],
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({}),
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        SharedModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatIconModule,

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(TimelineService)
    fixture = TestBed.createComponent(EntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an entry', () => {
    expect(component.entry).toBeTruthy();
  });

  it('should modify entry', () => {
    fixture = TestBed.createComponent(EntryComponent);
    component = fixture.componentInstance;

    const spyDelete = spyOn(component.modify, 'emit')
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('button');
    component.modifyEntry()
    fixture.detectChanges();

    expect(component.modify.emit).toHaveBeenCalledWith(component.entry)
  });

  it('should delete entry', () => {
    fixture = TestBed.createComponent(EntryComponent);
    component = fixture.componentInstance;

    const spyDelete = spyOn(component.delete, 'emit')
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('button');
    component.deleteEntry()
    fixture.detectChanges();

    expect(component.delete.emit).toHaveBeenCalledWith(component.entry)
  });
});
