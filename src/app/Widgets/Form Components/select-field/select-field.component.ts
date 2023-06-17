import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit{

  @Input() data: any[] = [];
  @Input() placeholder: string = '';
  @Input() formControl: any = null;

  @Output() onSelectEvent = new EventEmitter();

  constructor(){
  }

  ngOnInit(): void {
    if(this.formControl.value) this.selectedOption = this.formControl.value;
  }

  //Select option
  public selectedOption: any;
  public setOption(option: any){
    this.selectedOption = option;
    this.formControl.setValue(this.selectedOption);
    this.onSelectEvent.emit(this.selectedOption);
  }

  //Open-Close select field
  public isSelectFieldOpened: boolean = false;
  public openCloseSelectField(){
    this.isSelectFieldOpened = !this.isSelectFieldOpened;
  }

  //Close select field
  public closeSelectField(){
    if(!this.formControl.valid) this.formControl.markAsDirty();
    this.isSelectFieldOpened = false;
  }
}
