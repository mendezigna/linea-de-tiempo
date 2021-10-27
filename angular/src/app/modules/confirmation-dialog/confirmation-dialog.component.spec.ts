import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ],  
      imports: [
        MatDialogModule,
        TranslateTestingModule.withTranslations({}),
        CommonModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: (result : boolean) => { } } } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('on no click', () => {
    const spyDialog = spyOn(component.dialogRef, 'close')
    component.onNoClick()
    expect(spyDialog.calls.count()).toBe(1)
  })

  it('submit', () => {
    const spyDialog = spyOn(component.dialogRef, 'close')
    component.submit()
    expect(spyDialog.calls.count()).toBe(1)
  })
});
