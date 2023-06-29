export interface OrderBasicView {
  id: string;
  reference: string;
  profileImage: string;
  storeName: string;
  itemName: string;
  quantity: number;
  price: number;
  customerName: string;
  receiver: string;
  city: string;
  country: string;
  createdAt: Date;
  orderStatus: string;
}
