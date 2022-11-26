import { TestBed } from '@angular/core/testing';

import { AuthAlumnoService } from './auth-alumno.service';

describe('AuthAlumnoService', () => {
  let service: AuthAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
