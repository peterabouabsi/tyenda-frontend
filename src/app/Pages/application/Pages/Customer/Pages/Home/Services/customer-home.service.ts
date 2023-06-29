import { Injectable } from '@angular/core';

//Serivces
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerHomeService {

  constructor(private apiService: ApiService) { }

  public getTopSellingItem(){
    return this.apiService.get('/Item/Top()');
  }

  public getOrdersOverview(){
    return this.apiService.get('/Order/Overview()');
  }

  public getRandomStores(top: number, skip: number){
    return this.apiService.get('/Store/Random()?top='+top+'&skip='+skip);
  }

  public getRandomItems(top: number, skip: number){
    return this.apiService.get('/Item/Random()?top='+top+'&skip='+skip);
  }

  public getRecentOrders(){
    return this.apiService.get('/Order/Recent()');
  }
}
