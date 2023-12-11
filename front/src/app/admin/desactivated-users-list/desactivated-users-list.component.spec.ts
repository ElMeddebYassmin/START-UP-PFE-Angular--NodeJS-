import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactivatedUsersListComponent } from './desactivated-users-list.component';

describe('DesactivatedUsersListComponent', () => {
  let component: DesactivatedUsersListComponent;
  let fixture: ComponentFixture<DesactivatedUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesactivatedUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesactivatedUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
