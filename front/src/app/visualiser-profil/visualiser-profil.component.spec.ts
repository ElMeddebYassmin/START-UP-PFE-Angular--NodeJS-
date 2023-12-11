import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserProfilComponent } from './visualiser-profil.component';

describe('VisualiserProfilComponent', () => {
  let component: VisualiserProfilComponent;
  let fixture: ComponentFixture<VisualiserProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualiserProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
