import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModerateCardComponent } from './store-moderate-card.component';

describe('StoreModerateCardComponent', () => {
  let component: StoreModerateCardComponent;
  let fixture: ComponentFixture<StoreModerateCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreModerateCardComponent]
    });
    fixture = TestBed.createComponent(StoreModerateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
