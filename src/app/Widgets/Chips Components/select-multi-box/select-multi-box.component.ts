import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-select-multi-box',
  templateUrl: './select-multi-box.component.html',
  styleUrls: ['./select-multi-box.component.scss']
})
export class SelectMultiBoxComponent implements OnInit{

  @Input() data?: any[] = [];

  @Output() onSelectEvent = new EventEmitter();

  public selectedData: any[] = [];

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
  }

  public onBoxSelect(data: any, event: any){
    this.modifyBoxStatus(event);
    this.globalService.checkExistancy(this.selectedData, data, (exist: boolean, index: number) => {
      if(!exist){
        this.selectedData.push(data);
      }else{
        if(index == 0) this.selectedData.shift();
        else this.selectedData.splice(index, 1);
      }
    });
    this.onSelectEvent.emit(this.selectedData);
  }

  /*Set box to active-inactive*/
  private modifyBoxStatus(event: any){
    if(event.srcElement.className.includes('active')) event.srcElement.className = event.srcElement.className.replace('active', '');
    else event.srcElement.className += " active"
  }
  /*Set box to active-inactive*/

}
