import { TestBed } from '@angular/core/testing';

import { ComunicacionHttpService } from './comunicacion-http.service';

describe('ComunicacionHttpService', () => {
  let service: ComunicacionHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicacionHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
