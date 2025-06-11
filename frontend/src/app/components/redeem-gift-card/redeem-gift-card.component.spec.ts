import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemGiftCardComponent } from './redeem-gift-card.component';

describe('RedeemGiftCardModalComponent', () => {
  let component: RedeemGiftCardComponent;
  let fixture: ComponentFixture<RedeemGiftCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedeemGiftCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemGiftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
