export interface CartStoreBasicView {
  id: string;
  storeId: string;
  profileImage: string;
  backgroundImage: string;
  storeName: string;
  followersCount: number;
  itemsCount: number;
  ordersCount: number;
  isAddedToCart: boolean;
}
