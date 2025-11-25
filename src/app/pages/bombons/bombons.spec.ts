import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bombons } from './bombons';

describe('Bombons', () => {
  let component: Bombons;
  let fixture: ComponentFixture<Bombons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bombons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bombons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
