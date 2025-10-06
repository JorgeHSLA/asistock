import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallBox } from './small-box';

describe('SmallBox', () => {
  let component: SmallBox;
  let fixture: ComponentFixture<SmallBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
