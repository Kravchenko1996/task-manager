import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowledgementDialogComponent } from './acknowledgement-dialog.component';

describe('AcknowledgementDialogComponent', () => {
  let component: AcknowledgementDialogComponent;
  let fixture: ComponentFixture<AcknowledgementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcknowledgementDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcknowledgementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
