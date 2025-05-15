import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheLuckyCrewmateComponent } from './the-lucky-crewmate.component';

describe('TheLuckyCrewmateComponent', () => {
  let component: TheLuckyCrewmateComponent;
  let fixture: ComponentFixture<TheLuckyCrewmateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheLuckyCrewmateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheLuckyCrewmateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
