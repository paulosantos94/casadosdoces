import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pudins } from './pudins';

describe('Pudins', () => {
  let component: Pudins;
  let fixture: ComponentFixture<Pudins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pudins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pudins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
