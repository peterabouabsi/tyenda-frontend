import { Component, OnInit } from '@angular/core';

//Services
import { NotificationService } from 'src/app/Shared/Services/Notification/notification.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit{

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notificationService.subscribeToPushNotification();
  }
}
