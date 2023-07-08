import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
        'x-mark',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/x-mark.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'arrow-right',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/arrow-right.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'circle-minus',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/circle-minus.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'bell',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/bell.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'heart',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/heart.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'full-heart',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/full-heart.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'filter',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/filter.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'star',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/star.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'full-star',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/full-star.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'person',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/person.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'link',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/link.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'phone',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/phone.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'mailbox',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/mailbox.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'list',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/list.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'play',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/play.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'location',
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Svg/location.svg')
      );
    }
}
