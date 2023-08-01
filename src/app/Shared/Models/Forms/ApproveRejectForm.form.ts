export interface ApproveRejectForm {
  orderId: string;
  isApproved: boolean;
  isRejected: boolean;
  rejectDescription?: string;
}
