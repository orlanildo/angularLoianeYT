import { TestBed } from '@angular/core/testing';

import { Courses2Service } from './courses2.service';

describe('Courses2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Courses2Service = TestBed.get(Courses2Service);
    expect(service).toBeTruthy();
  });
});
