import { TestBed } from '@angular/core/testing';

import { CrudCursoService } from './crud-curso.service';

describe('CrudCursoService', () => {
  let service: CrudCursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudCursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
