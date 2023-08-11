import { Injectable } from '@angular/core';

//Services
import { ApiService } from 'src/app/Shared/Services/Api/api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreHomeService {

  constructor(private apiService: ApiService) { }

  public getMonthlyIncome(year: number){
    return this.apiService.get('/Store/Incomes?year='+year);
  }
  public getTopCustomers(){
    return this.apiService.get('/Store/TopCustomers()');
  }
  public getRecentOrders(){
    return this.apiService.get('/Order/Recent()');
  }
  public getSimilarStores(take: number = -1){
    let queryParam = take != -1? '?take='+take : '';
    return this.apiService.get('/Store/SimilarStores()'+queryParam);
  }
}
