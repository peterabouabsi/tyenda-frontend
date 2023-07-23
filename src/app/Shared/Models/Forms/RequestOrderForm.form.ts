export interface RequestOrderForm{
  itemId: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  cityId: string;
  addressDetails: string;
  note: string;
  longitude: number;
  latitude: number;
  colors: ColorForm[];
  sizes: SizeForm[];
  colorSizes: ColorSizeForm[];
}

interface ColorForm{
  id: string;
  value: string;
  quantity: number;
}

interface SizeForm{
  code: string;
  number: number;
  quantity: number;
}

interface ColorSizeForm{
  id: string;
  value: string;
  sizes: SizeForm[];
}
