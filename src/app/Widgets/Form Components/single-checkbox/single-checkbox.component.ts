import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-single-checkbox',
  templateUrl: './single-checkbox.component.html',
  styleUrls: ['./single-checkbox.component.scss']
})
export class SingleCheckboxComponent implements OnInit{

  @Input() label: string = '';
  @Output() clickEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  @ViewChild('checkInput') checkInputRef: ElementRef;
  public onClick(){
    this.clickEvent.emit(this.checkInputRef.nativeElement.checked);
  }

}
