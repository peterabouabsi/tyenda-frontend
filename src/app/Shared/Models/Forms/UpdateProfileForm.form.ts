export interface UpdateProfileForm {
  updateCustomerForm?: UpdateCustomerForm;
  updateStoreForm?: UpdateStoreForm;
}

interface UpdateCustomerForm {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  onItem: boolean;
  onOrder: boolean;
}

interface UpdateStoreForm {
  name: string;
  email: string;
  website: string;
  phone: string;
  ownerName: string;
  ownerEmail: string;
  description: string;
  categoryIds: string[];
}
