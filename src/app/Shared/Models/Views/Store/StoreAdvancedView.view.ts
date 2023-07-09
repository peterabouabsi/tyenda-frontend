export interface storeAdvancedView {
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
  branches: branchView[];
  displayedBranch: number[]; // [lat, lng]
  isFollowed: boolean;
  isAddedToCart: boolean;
  countOrders: number;
  countItems: number;
  countFollowers: number;
}

export interface branchView {
  country: string;
  city: string;
  addressDetails: string;
  latitude: number;
  longitude: number;
}
