import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStoreComponent } from './home-store.component';

describe('HomeComponent', () => {
  let component: HomeStoreComponent;
  let fixture: ComponentFixture<HomeStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeStoreComponent]
    });
    fixture = TestBed.createComponent(HomeStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
