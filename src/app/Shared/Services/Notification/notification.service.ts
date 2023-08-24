import { Injectable } from '@angular/core';

//Constans
import { Constants } from '../../Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { OneSignal } from 'onesignal-ngx';

//Environment
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public appId: string = environment.oneSignal.appId;

  constructor(private globalService: GlobalService,
              private oneSignal: OneSignal) {
  }

  async onInit() {
    await this.oneSignal.init({ appId: this.appId });
  }

  //push notification
  public subscribeToPushNotification() {
    this.onInit().then(() => {
      let accountId = this.globalService.getStorage(Constants.STORAGE_SESSION).accountId;
      this.oneSignal.User.addTags({ account_id: accountId });
    });
  }
  public unsubscribeToPushNotification() {
    //this.unsubscribe();
  }

}
