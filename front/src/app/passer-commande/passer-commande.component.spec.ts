import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasserCommandeComponent } from './passer-commande.component';

describe('PasserCommandeComponent', () => {
  let component: PasserCommandeComponent;
  let fixture: ComponentFixture<PasserCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasserCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasserCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
