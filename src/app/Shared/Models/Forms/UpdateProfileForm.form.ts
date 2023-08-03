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
}

interface UpdateStoreForm {
  // Add properties specific to UpdateStoreForm if needed
}
