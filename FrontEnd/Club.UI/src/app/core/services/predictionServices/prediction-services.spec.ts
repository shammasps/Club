import { TestBed } from '@angular/core/testing';

import { PredictionServices } from './prediction-services';

describe('PredictionServices', () => {
  let service: PredictionServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredictionServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
