import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossyRoadGangBangComponent } from './crossy-road-gang-bang.component';

describe('CrossyRoadGangBangComponent', () => {
  let component: CrossyRoadGangBangComponent;
  let fixture: ComponentFixture<CrossyRoadGangBangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossyRoadGangBangComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossyRoadGangBangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
