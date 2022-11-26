import { TestBed } from '@angular/core/testing';

import { GuardianAlumnoService } from './guardian-alumno.service';

describe('GuardianAlumnoService', () => {
  let service: GuardianAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardianAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
