import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PseudoTextInputComponent } from './pseudo-text-input.component';

describe('PseudoTextInputComponent', () => {
  let component: PseudoTextInputComponent;
  let fixture: ComponentFixture<PseudoTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PseudoTextInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PseudoTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
