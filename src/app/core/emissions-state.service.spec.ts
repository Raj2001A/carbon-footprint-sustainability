import { TestBed } from '@angular/core/testing';

import { EmissionsStateService } from './emissions-state.service';

describe('EmissionsStateService', () => {
  let service: EmissionsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmissionsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
