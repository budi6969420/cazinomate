import { TestBed } from '@angular/core/testing';

import { GameMetadataService } from './game-metadata.service';

describe('GameMetadataService', () => {
  let service: GameMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
