import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-item-description',
  templateUrl: './customer-item-description.component.html',
  styleUrls: ['./customer-item-description.component.scss']
})
export class CustomerItemDescriptionComponent implements OnInit{

  constructor() {
  }

  ngOnInit(): void {
  }

  public onRateItem(){
    //save to database
  }
  public displaySelectedImage(image: any){}
  public addRemoveCart(){}
  public openCommentsSection(){}
  public order(){}

}
