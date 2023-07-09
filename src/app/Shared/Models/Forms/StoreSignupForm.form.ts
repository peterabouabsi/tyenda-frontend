interface StoreBranchForm{
  cityId: string;
  addressDetails: string;
  latitude: number;
  longitude: number;
}
export interface StoreSignupForm{
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  storeName: string;
  ownerName: string;
  ownerEmail: string;
  website: string;
  description: string;
  branches: StoreBranchForm[];
  categoryIds: string[]
}
