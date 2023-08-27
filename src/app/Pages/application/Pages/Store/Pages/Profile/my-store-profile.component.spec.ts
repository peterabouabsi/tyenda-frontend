import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStoreProfileComponent } from './my-store-profile.component';

describe('MyStoreProfileComponent', () => {
  let component: MyStoreProfileComponent;
  let fixture: ComponentFixture<MyStoreProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyStoreProfileComponent]
    });
    fixture = TestBed.createComponent(MyStoreProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
