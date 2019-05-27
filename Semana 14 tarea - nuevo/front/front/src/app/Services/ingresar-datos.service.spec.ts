import { TestBed } from '@angular/core/testing';

import { IngresarDatosService } from './ingresar-datos.service';

describe('IngresarDatosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngresarDatosService = TestBed.get(IngresarDatosService);
    expect(service).toBeTruthy();
  });
});
