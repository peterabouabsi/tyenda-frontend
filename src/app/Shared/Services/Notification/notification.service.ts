import { Injectable } from '@angular/core';

//Constans
import { Constants } from '../../Models/constants.model';

//Services
import { OneSignal } from 'onesignal-ngx';

//Environment
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public appId: string = environment.oneSignal.appId;

  constructor(private oneSignal: OneSignal) {
  }

  async onInit() {
    await this.oneSignal.init({ appId: this.appId });
  }
  public setTag(tag: any = {}){
    this.oneSignal.User.addTags(tag);
  }

  public subscribe() {
    let permission = this.oneSignal.Notifications.permission;
    if (!permission) {
      this.oneSignal.Notifications.requestPermission().then(() => {});
    } else {
      this.oneSignal.User.PushSubscription.optIn().then(() => {});
    }
  }
  public unsubscribe() {
    this.oneSignal.User.PushSubscription.optOut().then(() => {
      this.oneSignal.User.removeTag('account_id');
    });
  }
}
