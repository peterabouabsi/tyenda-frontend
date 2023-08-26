import { Component, OnInit } from '@angular/core';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit{

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    //this.globalService.subscribeToPushNotification();
  }
}
