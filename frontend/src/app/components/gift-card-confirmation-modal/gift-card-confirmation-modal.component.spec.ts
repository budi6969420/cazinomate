import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardConfirmationModalComponent } from './gift-card-confirmation-modal.component';

describe('GiftCardConfirmationModalComponent', () => {
  let component: GiftCardConfirmationModalComponent;
  let fixture: ComponentFixture<GiftCardConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftCardConfirmationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCardConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
