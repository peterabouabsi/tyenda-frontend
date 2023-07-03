export interface ItemAdvancedView {
  id: string;
  value: string;
  displayedImage: string;
  otherImages: string[];
  createdAt: Date;
  storeName: string;
  storeImage: string;
  rate: number;
  myRate: number;
  ratersCount: number;
  discount: number;
  oldPrice: number;
  currentPrice: number;
  notes: string[];
  categories: string[];
  countLikes: number;
  countOrders: number;
  countComments: number;
  colors: string[];
  sizes: string[];
  description: string;
  isAddedToCart: boolean;
  isLiked: boolean;
}
