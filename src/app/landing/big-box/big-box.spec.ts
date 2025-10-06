import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigBox } from './big-box';

describe('BigBox', () => {
  let component: BigBox;
  let fixture: ComponentFixture<BigBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
