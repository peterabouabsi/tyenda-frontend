export interface StoreAdvancedView {
  id: string;
  name: string;
  description: string;
  backgroundImage: string;
  profileImage: string;
  createdAt: Date;
  ownerName: string;
  ownerEmail: string;
  website: string;
  email: string;
  phone: string;
  videoUrl: string;
  videoPosterUrl: string;
  categories: string[];
  branches: BranchView[];
  displayedBranch: number[]; // [lat, lng]
  isFollowed: boolean;
  isAddedToCart: boolean;
  countOrders: number;
  countItems: number;
  countFollowers: number;
}

export interface BranchView {
  country: string;
  city: string;
  addressDetails: string;
  latitude: number;
  longitude: number;
}
