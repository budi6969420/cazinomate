import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutConfirmationModalComponent } from './payout-confirmation-modal.component';

describe('PayoutConfirmationModalComponent', () => {
  let component: PayoutConfirmationModalComponent;
  let fixture: ComponentFixture<PayoutConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutConfirmationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
