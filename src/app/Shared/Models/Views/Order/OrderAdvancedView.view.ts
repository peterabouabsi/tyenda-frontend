export interface OrderAdvancedView {
  id: string;
  itemId: string;
  itemImage: string;
  itemName: string;
  orderStatus: string;
  rejectDescription: string;
  storeName: string;
  storeProfileImage: string;
  latitude: number;
  longitude: number;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  reference: string;
  city: string;
  country: string;
  addressDetails: string;
  note: string;
  feedbacks: FeebackView[];
  price: number;
  discount: number;
  quantity: number;
  colors?: ColorView[];
  sizes?: SizeView[];
  colorSizes?: ColorSizesView[];
}

interface FeebackView{
  id: string;
  value: string;
  createdAt: Date,
  customerProfileImage: string;
}
interface ColorView{
  id: string;
  colorId: string;
  color: string;
  quantity: number;
}
interface SizeView{
  id: string;
  code: string;
  number: number;
  quantity: number;
}
interface ColorSizesView{
  colorId: string;
  color: string;
  sizes: SizeView[]
}
