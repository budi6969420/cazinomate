import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTileComponent } from './game-tile.component';

describe('GameTileComponent', () => {
  let component: GameTileComponent;
  let fixture: ComponentFixture<GameTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
