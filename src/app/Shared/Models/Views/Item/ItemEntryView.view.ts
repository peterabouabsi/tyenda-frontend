interface ColorView{
  id: string;
  value: string;
  quantity: number;
}
interface SizeView{
  id: string;
  code: string;
  number: number;
  quantity: number;
}
export interface ItemEntryView{
  id: string;
  value: string;
  imageUrl: string;
  price: number;
  discount: number;
  stock: number;
  colors: ColorView[];
  sizes: SizeView[];
}
