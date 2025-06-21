import { TestBed } from '@angular/core/testing';

import { ClockRegistryService } from './clock-registry.service';

describe('ClockRegistryService', () => {
  let service: ClockRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
