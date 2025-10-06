import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioData } from './usuario-data';

describe('UsuarioData', () => {
  let component: UsuarioData;
  let fixture: ComponentFixture<UsuarioData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
