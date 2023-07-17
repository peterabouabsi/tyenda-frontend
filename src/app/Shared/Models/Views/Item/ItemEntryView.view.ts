interface ColorView{
  id: string;
  value: string;
  quantity: number;
}
interface AdvancedSizeView{
  id: string;
  code: string;
  number: number;
  quantity: number;
}
interface BasicSizeView{
  code: string;
  number: number;
  quantity: number;
}
interface ColorSizeView{
  value: string;
  sizes: BasicSizeView[];
}
export interface ItemEntryView{
  id: string;
  value: string;
  imageUrl: string;
  price: number;
  discount: number;
  stock: number;
  colors: ColorView[];
  sizes: AdvancedSizeView[];
  colorSizes: ColorSizeView[];
}
