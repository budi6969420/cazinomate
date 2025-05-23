import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementBarComponent } from './announcement-bar.component';

describe('AnnouncementBarComponent', () => {
  let component: AnnouncementBarComponent;
  let fixture: ComponentFixture<AnnouncementBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
