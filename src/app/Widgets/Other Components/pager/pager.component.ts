import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

//Config
import { PagerConfig } from 'src/app/Shared/Models/Config/Pager/PagerConfig.config';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit{

  @Input() config: PagerConfig = {button: {}, dataCount: 0};
  @Input() itemPerPage: number = 0;

  @Output() onSetPage = new EventEmitter();

  public activePage: number = 1;
  public pages: number[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.initPages();
    }, 1000)
  }

  /*------------------ Init pager ------------------*/
  private initPages(){
    if(this.itemPerPage > 0){
      let pages = Math.ceil(this.config.dataCount / this.itemPerPage);

      for(let i = 1; i <= pages; i++){
        this.pages.push(i);
      }
    }
  }
  /*------------------ Init pager ------------------*/


  /*------------------ Set page ------------------*/
  public setPage(page: number){
    this.activePage = page;
    this.onSetPage.emit({top: this.itemPerPage, skip: this.itemPerPage*(this.activePage - 1)});
  }
  /*------------------ Set page ------------------*/

  /*------------------ On Button Click ------------------*/
  public viewAllData(){
    this.router.navigate([this.config.button.path], {queryParams: this.config.button.queryParams});
  }
  /*------------------ On Button Click ------------------*/

}
