import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

//Environments
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit{

  /* global variables --------- */
  public fileBaseUrl: string = environment.fileBaseUrl;
  /* --------- global variables */

  @Input() notification: any = {};
  @Output() onClickEvent = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public onClick(){
    this.onClickEvent.emit({link: this.notification.link, id: this.notification.notificationId});
  }

}
