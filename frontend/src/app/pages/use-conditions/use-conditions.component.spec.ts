import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseConditionsComponent } from './use-conditions.component';

describe('UseConditionsComponent', () => {
  let component: UseConditionsComponent;
  let fixture: ComponentFixture<UseConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseConditionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
