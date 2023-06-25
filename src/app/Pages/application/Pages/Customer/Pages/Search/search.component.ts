import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{


  constructor() {
  }

  ngOnInit(): void {
  }

  /*----------- Switch between Store/Item filter options ------------*/
  public activeFilterIndex: number = 1;
  public setFilterIndex(index: number){
    this.activeFilterIndex = index;
  }
  /*----------- Switch between Store/Item filter options ------------*/

}
