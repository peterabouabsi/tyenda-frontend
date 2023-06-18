import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarStoreComponent } from './navbar-store.component';

describe('NavbarStoreComponent', () => {
  let component: NavbarStoreComponent;
  let fixture: ComponentFixture<NavbarStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarStoreComponent]
    });
    fixture = TestBed.createComponent(NavbarStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
