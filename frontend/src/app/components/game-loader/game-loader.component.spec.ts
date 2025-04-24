import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLoaderComponent } from './game-loader.component';

describe('GameLoaderComponent', () => {
  let component: GameLoaderComponent;
  let fixture: ComponentFixture<GameLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
