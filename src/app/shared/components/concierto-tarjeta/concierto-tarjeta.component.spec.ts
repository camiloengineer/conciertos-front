import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciertoTarjetaComponent } from './concierto-tarjeta.component';

describe('ConciertoTarjetaComponent', () => {
  let component: ConciertoTarjetaComponent;
  let fixture: ComponentFixture<ConciertoTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciertoTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciertoTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
