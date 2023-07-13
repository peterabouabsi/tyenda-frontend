import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-order',
  templateUrl: './request-order.component.html',
  styleUrls: ['./request-order.component.scss']
})
export class RequestOrderComponent implements OnInit{

  public itemToOrder: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.readItemToOrder();
  }

  private readItemToOrder(){
    let itemId = this.route.snapshot.params['itemId'];
    this.itemToOrder = {
      id: "b9c4d995-6fd9-4888-85f1-fe82877257b1",
      value: "Xbox",
      imageUrl: "https://images.unsplash.com/photo-1612801799890-4ba4760b6590?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHhib3h8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      discount: 50,
      rate: 5.0,
      price: 150.250,
      countOrders: 3,
      countLikes: 0,
      qty: 3
    }
  }

}
