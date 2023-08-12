import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStoreBasicCardComponent } from './item-store-basic-card.component';

describe('ItemStoreBasicCardComponent', () => {
  let component: ItemStoreBasicCardComponent;
  let fixture: ComponentFixture<ItemStoreBasicCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemStoreBasicCardComponent]
    });
    fixture = TestBed.createComponent(ItemStoreBasicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
