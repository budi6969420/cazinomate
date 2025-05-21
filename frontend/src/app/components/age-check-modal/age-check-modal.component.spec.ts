import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeCheckModalComponent } from './age-check-modal.component';

describe('AgeCheckModalComponent', () => {
  let component: AgeCheckModalComponent;
  let fixture: ComponentFixture<AgeCheckModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeCheckModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeCheckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
