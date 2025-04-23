import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyConfirmationModalComponent } from './buy-confirmation-modal.component';

describe('BuyConfirmationModalComponent', () => {
  let component: BuyConfirmationModalComponent;
  let fixture: ComponentFixture<BuyConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyConfirmationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
