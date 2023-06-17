import { Component, OnInit } from '@angular/core';

//Services
import { IconService } from './Shared/Services/Svg/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public title = 'tyenda';

  constructor(private iconService: IconService) {
  }

  ngOnInit(): void {
  }
}
