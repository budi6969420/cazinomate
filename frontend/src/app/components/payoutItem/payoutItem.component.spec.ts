import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutItemComponent } from './payoutItem.component';

describe('PayoutItemComponent', () => {
  let component: PayoutItemComponent;
  let fixture: ComponentFixture<PayoutItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
