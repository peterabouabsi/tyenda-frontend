export interface AddUpdateItemForm{
  id?: string;
  value: string;
  description: string;
  price: number;
  discount: number;
  notes: string[];
  categories: string[];
  colors: ColorForm[];
  sizes: SizeForm[];
  colorSizes: ColorSizeForm[]
}

interface ColorForm{
  value: string;
  quantity: number;
}

interface SizeForm{
  code: string;
  number: number;
  quantity: number;
}

interface ColorSizeForm{
  value: string;
  sizes: SizeForm[]
}
