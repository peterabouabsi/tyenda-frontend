import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-price-range-select',
  templateUrl: './price-range-select.component.html',
  styleUrls: ['./price-range-select.component.scss'],
})
export class PriceRangeSelectComponent implements OnInit {

  @Output() onRangeEvent = new EventEmitter();

  @Input() max: number;
  @Input() min: number;
  @Input() step: number;

  //Results
  public minSalary: number = 0;
  public maxSalary: number;

  constructor() {}

  ngOnInit() {
    if(this.max == null){
      this.maxSalary = 10000;
    }else{
      this.maxSalary = this.max;
    }
  }

  @ViewChild("progress") progress: ElementRef;
  public change(type: any, event: any){

    if(type == 'min'){
      if(event.target.value >= this.maxSalary){
        event.target.value = this.maxSalary - this.step;
        this.minSalary = this.maxSalary - this.step;
      }else if(this.maxSalary == this.max){
        this.progress.nativeElement.style.left = 100 - (((this.max - this.minSalary) / this.max) * 100)+"%";
      }else{
        //If both are not at the edges, then apply both left and right
        this.progress.nativeElement.style.right = 100 - (((this.maxSalary - this.min) / this.max) * 100)+"%";
        this.progress.nativeElement.style.left = 100 - (((this.max - this.minSalary) / this.max) * 100)+"%";
      }
    }else if (type == 'max'){


      if(event.target.value <= this.minSalary){
        event.target.value = this.minSalary + this.step;
        this.maxSalary = this.minSalary + this.step;
      }
      if(this.minSalary == this.min){
        this.progress.nativeElement.style.right = 100 - (((this.maxSalary - this.min) / this.max) * 100)+"%";
      }else{
        //If both are not at the edges, then apply both left and right
        this.progress.nativeElement.style.right = 100 - (((this.maxSalary - this.min) / this.max) * 100)+"%";
        this.progress.nativeElement.style.left = 100 - (((this.max - this.minSalary) / this.max) * 100)+"%";
      }
    }
    this.onRangeEvent.emit([this.minSalary, this.maxSalary]);
  }
}
