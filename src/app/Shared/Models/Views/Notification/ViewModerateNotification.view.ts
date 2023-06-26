export interface ViewModerateNotification{
  notificationId: string;
  createdAt: Date,
  link: string;
  title: string;
  description: string;
  itemImageUrl: string
  storeImageUrl: string;
  isViewed: boolean;
}
