import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLoanPopupComponent } from './confirm-loan-popup.component';

describe('ConfirmLoanPopupComponent', () => {
  let component: ConfirmLoanPopupComponent;
  let fixture: ComponentFixture<ConfirmLoanPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmLoanPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmLoanPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
