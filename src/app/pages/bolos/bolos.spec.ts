import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bolos } from './bolos';

describe('Bolos', () => {
  let component: Bolos;
  let fixture: ComponentFixture<Bolos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bolos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bolos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
