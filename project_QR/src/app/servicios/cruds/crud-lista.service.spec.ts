import { TestBed } from '@angular/core/testing';

import { CrudListaService } from './crud-lista.service';

describe('CrudListaService', () => {
  let service: CrudListaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudListaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
